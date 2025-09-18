<script>
  import { onMount } from 'svelte';
  import { push } from 'svelte-spa-router';
  import IniciarTramiteView from './IniciarTramiteView.svelte';
  import { fade } from 'svelte/transition';
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  let tipoPermitido = ['admin', 'user', 'empleado_n1', 'solicitante'];
  let notificacion = '';
  let showLogoutConfirm = false;
  let mensajeExito = '';

  onMount(() => {
    if (!userInfo || !tipoPermitido.includes(userInfo.tipo)) {
      notificacion = 'No tienes permiso para acceder a esta página.';
      setTimeout(() => push('/'), 2000);
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
  function mostrarExito(msg) {
    mensajeExito = msg;
    setTimeout(() => mensajeExito = '', 2500);
  }
</script>

<style>
  .home-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 32px 24px;
    max-width: 400px;
    margin: 40px auto;
    text-align: center;
  }
  .btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-weight: bold;
    cursor: pointer;
    margin-bottom: 10px;
  }
  .notif {
    color: #ef4444;
    margin-bottom: 16px;
    font-weight: bold;
  }
  .exito {
    color: #22c55e;
    background: #f0fdf4;
    border-radius: 8px;
    padding: 8px 0;
    margin-bottom: 16px;
    font-weight: bold;
    animation: fadeInDown 0.7s;
  }
  .animated {
    animation: fadeInDown 0.7s;
  }
  @keyframes fadeInDown {
    from { opacity: 0; transform: translateY(-30px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .modal-bg {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
  }
  .modal {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.12);
    padding: 24px 32px;
    text-align: center;
  }
  .btn-cancel {
    background: #e5e7eb;
    color: #374151;
    margin-left: 10px;
  }
</style>

<div class="home-card" in:fade={{ duration: 400 }}>
  {#if notificacion}
    <div class="notif">{notificacion}</div>
  {:else}
    <h1 class="animated">¡Bienvenido, {userInfo.nombre}!</h1>
    <p>Hola {userInfo.nombre} {userInfo.apellido}! Eres tipo de usuario: <b>{userInfo.tipo}</b></p>
    {#if mensajeExito}
      <div class="exito">{mensajeExito}</div>
    {/if}
    <IniciarTramiteView on:tramiteExito={() => mostrarExito('✅ Trámite creado con éxito')} />
    <button class="btn" on:click={handleLogout}>Logout</button>
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
