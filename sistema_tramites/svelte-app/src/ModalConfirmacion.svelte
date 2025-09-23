<script>
  export let usuarioSeleccionado;
  export let modo;
  import { createEventDispatcher } from 'svelte';
  const dispatch = createEventDispatcher();
</script>

<style>
  .modal-bg {
    position: fixed;
    top: 0; left: 0; right: 0; bottom: 0;
    background: rgba(0,0,0,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 100;
  }
  .modal {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(59,130,246,0.12);
    padding: 32px 40px;
    text-align: center;
    min-width: 320px;
    max-width: 90vw;
  }
  .modal-title {
    font-size: 1.3rem;
    color: #3b82f6;
    font-weight: bold;
    margin-bottom: 12px;
  }
  .modal-btns {
    display: flex;
    gap: 16px;
    justify-content: center;
    margin-top: 24px;
  }
  .btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-weight: bold;
    cursor: pointer;
    font-size: 1rem;
    transition: background 0.2s;
  }
  .btn-cancel { background: #e5e7eb; color: #374151; }
  .btn:hover { opacity: 0.85; }
</style>

<div class="modal-bg">
  <div class="modal">
    <div class="modal-title">
      {#if modo === 'editar'}Editar usuario{/if}
      {#if modo === 'desactivar'}¿Desactivar usuario?{/if}
      {#if modo === 'reset'}¿Resetear contraseña?{/if}
    </div>
    <div>
      <b>{usuarioSeleccionado?.nombre}</b> <br>
      <span style="color:#6b7280">{usuarioSeleccionado?.email}</span>
    </div>
    <div class="modal-btns">
      <button class="btn" on:click={() => dispatch('confirm')}>Confirmar</button>
      <button class="btn btn-cancel" on:click={() => dispatch('close')}>Cancelar</button>
    </div>
  </div>
</div>
