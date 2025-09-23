<script>
  let email = '';
  let password = '';
  let mensaje = '';

  async function handleRegister() {
    try {
      const response = await fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: email, password })
      });
      const data = await response.json();
      if (response.ok) {
        mensaje = 'Usuario registrado correctamente. Ahora puedes iniciar sesión.';
      } else {
        mensaje = data.error || 'No se pudo registrar.';
      }
    } catch (err) {
      mensaje = 'Error en el servidor.';
    }
  }
</script>

<style>
  .register-card {
    background: #fff;
    border-radius: 16px;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    padding: 32px 24px;
    max-width: 350px;
    margin: 40px auto;
    text-align: center;
  }
  .input {
    width: 90%;
    padding: 10px;
    margin-bottom: 16px;
    border-radius: 8px;
    border: 1px solid #d1d5db;
    font-size: 1rem;
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
  .msg {
    color: #22c55e;
    margin-bottom: 16px;
    font-weight: bold;
  }
</style>

<div class="register-card">
  <h2>Registrarse</h2>
  <input class="input" type="email" placeholder="Email" bind:value={email} />
  <input class="input" type="password" placeholder="Contraseña" bind:value={password} />
  <button class="btn" on:click={handleRegister}>Registrar</button>
  {#if mensaje}
    <div class="msg">{mensaje}</div>
  {/if}
</div>
