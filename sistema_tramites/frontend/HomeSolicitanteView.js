import React from 'react';
import IniciarTramiteView from './IniciarTramiteViewComponent';
import { useNavigate } from 'react-router-dom';

function HomeSolicitanteView() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };
  return (
    <div>
      <h1>Home Solicitante</h1>
      <p>Hola {userInfo.nombre} {userInfo.apellido}! Eres tipo de usuario: {userInfo.tipo}</p>
      <IniciarTramiteView />
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomeSolicitanteView;
