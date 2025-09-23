<script>
  import { onMount } from 'svelte';
  import Modal from './ModalConfirmacion.svelte';
  let areas = [];
  let showModal = false;
  let areaSeleccionada = null;
  let modo = '';

  // Fetch real de áreas desde el backend
  const API_URL = 'http://localhost:3001/api/areas';
  async function fetchAreas() {
    try {
      const res = await fetch(API_URL);
      areas = await res.json();
    } catch (err) {
      console.error('Error al obtener áreas:', err);
    }
  }
  onMount(fetchAreas);

  async function crearArea(nuevaArea) {
    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nuevaArea)
      });
      if (res.ok) await fetchAreas();
    } catch (err) {
      console.error('Error al crear área:', err);
    }
  }

  async function editarArea(area) {
    try {
      const res = await fetch(`${API_URL}/${area._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(area)
      });
      if (res.ok) await fetchAreas();
    } catch (err) {
      console.error('Error al editar área:', err);
    }
  }

  async function eliminarArea(area) {
    try {
      const res = await fetch(`${API_URL}/${area._id}`, {
        method: 'DELETE' });
      if (res.ok) await fetchAreas();
    } catch (err) {
      console.error('Error al eliminar área:', err);
    }
  }

  function abrirModal(area, accion) {
    areaSeleccionada = area;
    modo = accion;
    showModal = true;
  }
  function cerrarModal() {
    showModal = false;
    areaSeleccionada = null;
    modo = '';
  }
  async function confirmarAccion() {
    if (modo === 'editar') await editarArea(areaSeleccionada);
    if (modo === 'eliminar') await eliminarArea(areaSeleccionada);
    // Para crear, deberías tener un formulario aparte
    cerrarModal();
  }
</script>

<style>
  .crud-card {
    background: #fff;
    border-radius: 18px;
    box-shadow: 0 4px 24px rgba(16,185,129,0.10);
    padding: 36px 28px;
    max-width: 900px;
    margin: 40px auto;
    text-align: center;
    border: 2px solid #e0e7ff;
  }
  .crud-title {
    font-size: 2rem;
    color: #10b981;
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
    color: #10b981;
    font-weight: bold;
  }
  .acciones {
    display: flex;
    gap: 8px;
  }
  .btn {
    background: #10b981;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 7px 18px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.2s;
  }
  .btn-editar { background: #3b82f6; }
  .btn-eliminar { background: #ef4444; }
  .btn:hover { opacity: 0.85; }
</style>

<div class="crud-card">
  <div class="crud-title">Gestión de Áreas y Subáreas</div>
  <table>
    <thead>
      <tr>
        <th>Nombre</th>
        <th>Área Padre</th>
        <th>Acciones</th>
      </tr>
    </thead>
    <tbody>
      {#each areas as area}
        <tr>
          <td>{area.nombre}</td>
          <td>{area.parent || '-'}</td>
          <td class="acciones">
            <button class="btn btn-editar" on:click={() => abrirModal(area, 'editar')}>Editar</button>
            <button class="btn btn-eliminar" on:click={() => abrirModal(area, 'eliminar')}>Eliminar</button>
          </td>
        </tr>
      {/each}
    </tbody>
  </table>

  {#if showModal}
    <Modal {areaSeleccionada} {modo} on:close={cerrarModal} on:confirm={confirmarAccion} />
  {/if}
</div>
