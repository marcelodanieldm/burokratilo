<script>
  let tipo = '';
  let comentarios = '';
  let archivo = null;
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));

  async function enviarTramite() {
    if (!tipo || !comentarios || !archivo) {
      alert('Completa todos los campos');
      return;
    }
    const formData = new FormData();
    formData.append('tipo', tipo);
    formData.append('comentarios', comentarios);
    formData.append('archivo', archivo);
    try {
      const response = await fetch('http://localhost:5000/api/tramites', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${userInfo?.token || ''}`
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        alert('✅ Trámite creado');
      } else {
        alert(data.message || 'Error al crear trámite');
      }
    } catch (error) {
      alert('Error al crear trámite');
    }
  }
</script>

<style>
  .tramite-card {
    background: #f9fafb;
    border-radius: 16px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.06);
    padding: 24px 20px;
    max-width: 350px;
    margin: 24px auto;
    text-align: left;
  }
  .input {
    width: 100%;
    padding: 8px;
    margin-bottom: 12px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 1rem;
  }
  .btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 8px 20px;
    font-weight: bold;
    cursor: pointer;
    margin-top: 10px;
  }
</style>

<div class="tramite-card">
  <h2>Iniciar Trámite</h2>
  <input class="input" type="text" placeholder="Tipo" bind:value={tipo} />
  <input class="input" type="text" placeholder="Comentarios" bind:value={comentarios} />
  <input class="input" type="file" on:change={e => archivo = e.target.files[0]} />
  <button class="btn" on:click={enviarTramite}>Enviar</button>
</div>
