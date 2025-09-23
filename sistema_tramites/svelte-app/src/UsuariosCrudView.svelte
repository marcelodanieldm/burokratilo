<script>
  import { onMount } from 'svelte';
  import Modal from './ModalConfirmacion.svelte';
  let usuarios = [];
  let showModal = false;
  let usuarioSeleccionado = null;
  let modo = '';

  // Fetch real de usuarios desde el backend
  const API_URL = 'http://localhost:3001/api/usuarios';
  async function fetchUsuarios() {
    try {
      const res = await fetch(API_URL);
      usuarios = await res.json();
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  }
  onMount(fetchUsuarios);

  async function crearUsuario(nuevoUsuario) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevoUsuario)
      });
      if (res.ok) await fetchUsuarios();
    } catch (err) {
      console.error('Error al crear usuario:', err);
    }
  }

  async function editarUsuario(usuario) {
    try {
      const res = await fetch(`${API_URL}/${usuario._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(usuario)
      });
      if (res.ok) await fetchUsuarios();
    } catch (err) {
      console.error('Error al editar usuario:', err);
    }
  }

  async function desactivarUsuario(usuario) {
    try {
      const res = await fetch(`${API_URL}/${usuario._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: 'inactivo' })
      });
      if (res.ok) await fetchUsuarios();
    } catch (err) {
      console.error('Error al desactivar usuario:', err);
    }
  }

  function abrirModal(usuario, accion) {
    usuarioSeleccionado = usuario;
    modo = accion;
    showModal = true;
  }
  function cerrarModal() {
    showModal = false;
    usuarioSeleccionado = null;
    modo = '';
  }
  async function confirmarAccion() {
    if (modo === 'editar') await editarUsuario(usuarioSeleccionado);
    if (modo === 'desactivar') await desactivarUsuario(usuarioSeleccionado);
    // Para crear, deberías tener un formulario aparte
    cerrarModal();
  }
</script>

<style>
  .crud-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(59,130,246,0.10);
    padding: 36px 28px;
    max-width: 900px;
    margin: 40px auto;
    text-align: center;
    border: 2px solid #e0e7ff;
  }
  .crud-title {
    font-size: 2rem;
    color: #3b82f6;
    font-weight: bold;
    margin-bottom: 18px;
    letter-spacing: 1px;
  }
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 24px;
  }
  th, td {
    padding: 12px 8px;
    border-bottom: 1px solid #e5e7eb;
    text-align: left;
  }
  th {
    background: #f3f4f6;
    color: #3b82f6;
    font-weight: bold;
  }
  .acciones {
    display: flex;
    gap: 8px;
  }
  .btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 7px 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-editar { background: #f59e42; }
  .btn-desactivar { background: #ef4444; }
  .btn-reset { background: #6366f1; }
  .btn:hover { opacity: 0.85; }
</style>

<div class="crud-card">
  <div class="crud-title">Gestión de Usuarios</div>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Email</th>
        <th>Rol</th>
        <th>Estado</th>
        <th>Departamento</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each usuarios as usuario}
        <tr>
          <td>{usuario.nombre}</td>
          <td>{usuario.email}</td>
          <td>{usuario.rol}</td>
          <td>{usuario.estado}</td>
          <td>{usuario.departamento}</td>
          <td class="acciones">
            <button class="btn btn-editar" on:click={() => abrirModal(usuario, 'editar')}>Editar</button>
            <button class="btn btn-desactivar" on:click={() => abrirModal(usuario, 'desactivar')}>Desactivar</button>
            <button class="btn btn-reset" on:click={() => abrirModal(usuario, 'reset')}>Resetear</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if showModal}
    <Modal {usuarioSeleccionado} {modo} on:close={cerrarModal} on:confirm={confirmarAccion} />
  {/if}
</div>
