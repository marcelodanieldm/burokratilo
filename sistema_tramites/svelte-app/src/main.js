import './app.css';
import Router from 'svelte-spa-router';
import BienvenidaView from './BienvenidaView.svelte';
import LoginView from './LoginView.svelte';
import RegisterView from './RegisterView.svelte';
import HomeAdminView from './HomeAdminView.svelte';
import HomeUserView from './HomeUserView.svelte';
import HomeEmpleadoN1View from './HomeEmpleadoN1View.svelte';
import HomeSolicitanteView from './HomeSolicitanteView.svelte';
import HomeGuestView from './HomeGuestView.svelte';
import UsuariosCrudView from './UsuariosCrudView.svelte';
import AreasCrudView from './AreasCrudView.svelte';

const routes = {
  '/': BienvenidaView,
  '/login': LoginView,
  '/register': RegisterView,
  '/home-admin': HomeAdminView,
  '/home-user': HomeUserView,
  '/home-empleado-n1': HomeEmpleadoN1View,
  '/home-solicitante': HomeSolicitanteView,
  '/home-guest': HomeGuestView,
  '/usuarios-crud': UsuariosCrudView,
  '/areas-crud': AreasCrudView
};

const app = new Router({
  target: document.getElementById('app'),
  props: { routes }
});

export default app;
