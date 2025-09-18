import React from 'react';
import { Link } from 'react-router-dom';

function BienvenidaView() {
  return (
    <div style={{
      textAlign: 'center',
      marginTop: '60px',
      background: 'linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%)',
      minHeight: '100vh',
      padding: '40px'
    }}>
      <div style={{
        display: 'inline-block',
        background: '#fff',
        borderRadius: '16px',
        boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        padding: '40px 32px',
        maxWidth: '400px'
      }}>
        <h1 style={{ color: '#3b82f6', fontWeight: 'bold', fontSize: '2.2rem', marginBottom: '10px' }}>
          Burokratilo
        </h1>
        <h2 style={{ color: '#374151', fontSize: '1.2rem', marginBottom: '24px' }}>
          Sistema de gestión de trámites
        </h2>
        <p style={{ color: '#6b7280', marginBottom: '32px' }}>
          Por favor, inicia sesión o regístrate para continuar.
        </p>
        <Link to="/login"><button style={{
          background: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 'bold', cursor: 'pointer', marginRight: '10px'
        }}>Iniciar sesión</button></Link>
        <Link to="/register"><button style={{
          background: '#f59e42', color: '#fff', border: 'none', borderRadius: '8px', padding: '10px 24px', fontWeight: 'bold', cursor: 'pointer'
        }}>Registrarse</button></Link>
      </div>
    </div>
  );
}

export default BienvenidaView;
