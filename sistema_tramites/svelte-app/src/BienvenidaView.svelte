<script>
</script>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #e0e7ff 0%, #f3f4f6 100%);
  }
  .card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 40px 32px;
    max-width: 400px;
    text-align: center;
  }
  h1 {
    color: #3b82f6;
    font-weight: bold;
    font-size: 2.2rem;
    margin-bottom: 10px;
  }
  h2 {
    color: #374151;
    font-size: 1.2rem;
    margin-bottom: 24px;
  }
  p {
    color: #6b7280;
    margin-bottom: 32px;
  }
  .btn {
    background: #3b82f6;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 10px 24px;
    font-weight: bold;
    cursor: pointer;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  .btn-secondary {
    background: #f59e42;
  }
</style>

<div class="container">
  <div class="card">
    <h1>Burokratilo</h1>
    <h2>Sistema de gestión de trámites</h2>
    <p>Por favor, inicia sesión o regístrate para continuar.</p>
  <button class="btn" on:click={() => window.location.hash = '#/login'}>Iniciar sesión</button>
  <button class="btn btn-secondary" on:click={() => window.location.hash = '#/register'}>Registrarse</button>
  </div>
</div>
