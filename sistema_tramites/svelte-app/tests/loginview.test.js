import { render, fireEvent, waitFor } from '@testing-library/svelte';
import LoginView from '../src/LoginView.svelte';

// Mock window.location.hash
global.window = Object.create(window);
Object.defineProperty(window, 'location', {
  value: { hash: '' },
  writable: true
});

describe('LoginView', () => {
  beforeEach(() => {
    window.location.hash = '';
    localStorage.clear();
  });

  it('muestra mensaje de error si login falla', async () => {
    // Mock fetch para login fallido
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Credenciales inválidas' })
    }));
    const { getByText, getByPlaceholderText } = render(LoginView);
    await fireEvent.input(getByPlaceholderText('Email'), { target: { value: 'fail@correo.com' } });
    await fireEvent.input(getByPlaceholderText('Contraseña'), { target: { value: 'wrongpass' } });
    await fireEvent.click(getByText('Ingresar'));
    await waitFor(() => {
      expect(getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });

  it('limpia el mensaje de error al modificar campos', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: false,
      json: () => Promise.resolve({ message: 'Credenciales incorrectas' })
    }));
    const { getByText, getByPlaceholderText, queryByText } = render(LoginView);
    await fireEvent.input(getByPlaceholderText('Email'), { target: { value: 'fail@correo.com' } });
    await fireEvent.input(getByPlaceholderText('Contraseña'), { target: { value: 'wrongpass' } });
    await fireEvent.click(getByText('Ingresar'));
    await waitFor(() => {
      expect(getByText('Credenciales incorrectas')).toBeInTheDocument();
    });
    await fireEvent.input(getByPlaceholderText('Email'), { target: { value: 'nuevo@correo.com' } });
    expect(queryByText('Credenciales incorrectas')).not.toBeInTheDocument();
  });

  it('redirige correctamente según tipo de usuario', async () => {
    global.fetch = jest.fn(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({ rol: 'admin', token: '123', username: 'admin@correo.com', nombre: 'Admin' })
    }));
    const { getByText, getByPlaceholderText } = render(LoginView);
    await fireEvent.input(getByPlaceholderText('Email'), { target: { value: 'admin@correo.com' } });
    await fireEvent.input(getByPlaceholderText('Contraseña'), { target: { value: 'admin123' } });
    await fireEvent.click(getByText('Ingresar'));
    await waitFor(() => {
      expect(window.location.hash).toBe('#/home-admin');
    });
  });
});
