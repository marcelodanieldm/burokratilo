<script>

  let email = '';
  let password = '';
  let showReset = false;
  let resetEmail = '';
  let errorMsg = '';

  async function handleLogin() {
    errorMsg = '';
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (response.ok) {
        data.tipo = data.rol;
        localStorage.setItem('userInfo', JSON.stringify(data));
        if (data.tipo === 'admin') {
          window.location.hash = '#/home-admin';
        } else if (data.tipo === 'empleado_n1') {
          window.location.hash = '#/home-empleado-n1';
        } else if (data.tipo === 'empleado_n2') {
          window.location.hash = '#/home-empleado-n2';
        } else if (data.tipo === 'empleado_n3') {
          window.location.hash = '#/home-empleado-n3';
        } else if (data.tipo === 'solicitante') {
          window.location.hash = '#/home-solicitante';
        } else if (data.tipo === 'user') {
          window.location.hash = '#/home-user';
        } else {
          window.location.hash = '#/home-guest';
        }
      } else {
        errorMsg = data.message || 'Credenciales incorrectas';
      }
    } catch (err) {
      errorMsg = 'Error en el servidor';
    }
  }

  function handleShowReset() {
    showReset = true;
  }

  async function handleResetPassword() {
    try {
      const response = await fetch('/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: resetEmail })
      });
      const data = await response.json();
      if (response.ok) {
        alert('Enlace de recuperación enviado a tu correo');
        showReset = false;
      } else {
        alert(data.error || 'No se pudo enviar el enlace');
      }
    } catch (err) {
      alert('Error en el servidor');
    }
  }
</script>

<style>
  .login-card {
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
  .link {
    color: #3b82f6;
    cursor: pointer;
    text-decoration: underline;
    font-size: 0.95rem;
  }
</style>

{#if !showReset}
  <div class="login-card">
    <h2>Iniciar sesión</h2>
    {#if errorMsg}
      <div style="color:#ef4444; margin-bottom:10px;">{errorMsg}</div>
    {/if}
    <input class="input" type="email" placeholder="Email" bind:value={email} on:input={() => errorMsg = ''} />
    <input class="input" type="password" placeholder="Contraseña" bind:value={password} on:input={() => errorMsg = ''} />
    <button class="btn" on:click={handleLogin}>Ingresar</button>
    <div>
      <span class="link" on:click={handleShowReset}>¿Olvidaste tu contraseña?</span>
    </div>
  </div>
{:else}
  <div class="login-card">
    <h2>Restablecer contraseña</h2>
    <input class="input" type="email" placeholder="Email" bind:value={resetEmail} />
    <button class="btn" on:click={handleResetPassword}>Enviar enlace</button>
    <div>
      <span class="link" on:click={() => showReset = false}>Volver a iniciar sesión</span>
    </div>
  </div>
{/if}
