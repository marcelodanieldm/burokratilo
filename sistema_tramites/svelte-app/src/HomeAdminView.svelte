<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  let notificacion = '';
  let showLogoutConfirm = false;
  let mensajeExito = '';

  // Listas para los flujos
  let flujosCreados = [];
  let flujosDesarrollo = [];
  let flujosProduccion = [];
  let usuarios = [];

  // URL del backend para flujos y usuarios
  const API_URL_FLUJOS = 'http://localhost:3001/api/flujos';
  const API_URL_USUARIOS = 'http://localhost:3001/api/usuarios';
  async function fetchUsuarios() {
    try {
      const res = await fetch(API_URL_USUARIOS);
      usuarios = await res.json();
    } catch (err) {
      console.error('Error al obtener usuarios:', err);
    }
  }

  async function fetchFlujos() {
    try {
      const res = await fetch(API_URL_FLUJOS);
      const flujos = await res.json();
      flujosCreados = flujos.filter(f => f.estado === 'creado');
      flujosDesarrollo = flujos.filter(f => f.estado === 'desarrollo');
      flujosProduccion = flujos.filter(f => f.estado === 'produccion');
    } catch (err) {
      console.error('Error al obtener flujos:', err);
    }
  }

  onMount(() => {
    if (!userInfo || userInfo.rol !== 'admin') {
      notificacion = 'No tienes permiso para acceder a esta página.';
      setTimeout(() => push('/'), 2000);
    } else {
      fetchFlujos();
      fetchUsuarios();
    }
  });

  function handleLogout() {
    showLogoutConfirm = true;
  }
  function confirmLogout() {
    localStorage.removeItem('userInfo');
    push('/');
  }
  function cancelLogout() {
    showLogoutConfirm = false;
  }
</script>
<style>
  .home-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 32px 24px;
    max-width: 700px;
    margin: 40px auto;
    text-align: center;
  }
  .secciones-admin {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    margin: 32px 0;
  }
  .seccion {
    background: #f3f4f6;
    border-radius: 12px;
    padding: 18px 12px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
    min-height: 120px;
  }
  .seccion h2 {
    color: #3b82f6;
    font-size: 1.1rem;
    margin-bottom: 10px;
  }
  .placeholder {
    color: #6b7280;
    font-size: 0.98rem;
  
  }
  .btn-logout {
    background: linear-gradient(90deg, #ef4444 0%, #f59e42 100%);
    color: #fff;
    box-shadow: 0 2px 8px rgba(239,68,68,0.12);
    border: none;
    border-radius: 8px;
    padding: 10px 28px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
    font-size: 1.05rem;
    display: inline-flex;
    align-items: center;
    transition: background 0.2s, box-shadow 0.2s;
  }
  .btn-logout:hover {
    background: linear-gradient(90deg, #f59e42 0%, #ef4444 100%);
    box-shadow: 0 4px 16px rgba(239,68,68,0.18);
  }
</style>


<div class="home-card" in:fade={{ duration: 400 }}>
  {#if notificacion}
    <div class="notif">{notificacion}</div>
  {:else}
    <h1 class="animated">¡Bienvenido, {userInfo.nombre}!</h1>
      <div style="display:flex; gap:16px; justify-content:center; margin-bottom:18px;">
        <button class="btn btn-crud" on:click={() => window.location.hash = '#/usuarios-crud'}>
          <span style="margin-right:8px;">🧑‍💼</span> Gestión de Usuarios
        </button>
        <button class="btn btn-area" on:click={() => window.location.hash = '#/areas-crud'}>
          <span style="margin-right:8px;">🏢</span> Gestión de Áreas/Subáreas
        </button>
      </div>

    <p>Hola {userInfo.nombre} {userInfo.apellido}! Eres tipo de usuario: <b>{userInfo.tipo}</b></p>
    {#if mensajeExito}
      <div class="exito">{mensajeExito}</div>
    {/if}

      <div class="secciones-admin">
        <div class="seccion">
          <h2>Flujos de trámites creados</h2>
          {#if flujosCreados.length === 0}
            <div class="placeholder">No hay flujos creados.</div>
          {:else}
            <ul>
              {#each flujosCreados as flujo}
                <li>{flujo.nombre}</li>
              {/each}
            </ul>
          {/if}
        </div>
        <div class="seccion">
          <h2>Flujos de trámite en desarrollo</h2>
          {#if flujosDesarrollo.length === 0}
            <div class="placeholder">No hay flujos en desarrollo.</div>
          {:else}
            <ul>
              {#each flujosDesarrollo as flujo}
                <li>{flujo.nombre}</li>
              {/each}
            </ul>
          {/if}
        </div>
        <div class="seccion">
          <h2>Flujos de trámite en producción</h2>
          {#if flujosProduccion.length === 0}
            <div class="placeholder">No hay flujos en producción.</div>
          {:else}
            <ul>
              {#each flujosProduccion as flujo}
                <li>{flujo.nombre}</li>
              {/each}
            </ul>
          {/if}
        </div>
        <div class="seccion">
          <h2>Usuarios</h2>
          {#if usuarios.length === 0}
            <div class="placeholder">No hay usuarios registrados.</div>
          {:else}
            <ul>
              {#each usuarios as usuario}
                <li>{usuario.nombre} ({usuario.email}) - {usuario.rol}</li>
              {/each}
            </ul>
          {/if}
        </div>
      </div>

    <button class="btn btn-logout" on:click={handleLogout}>
      <span style="margin-right:8px;">🔒</span> Cerrar sesión
    </button>
    {#if showLogoutConfirm}
      <div class="modal-bg">
        <div class="modal">
          <p>¿Seguro que quieres cerrar sesión?</p>
          <button class="btn" on:click={confirmLogout}>Sí, salir</button>
          <button class="btn btn-cancel" on:click={cancelLogout}>Cancelar</button>
        </div>
      </div>
    {/if}
  {/if}
</div>

