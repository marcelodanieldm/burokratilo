import './app.css';
import LoginView from './LoginView.svelte';

const app = new LoginView({
  target: document.getElementById('app')
});

export default app;
