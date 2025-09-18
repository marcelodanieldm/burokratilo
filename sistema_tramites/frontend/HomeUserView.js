import React from 'react';
import { useNavigate } from 'react-router-dom';

function HomeUser() {
  const navigate = useNavigate();
  const userInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    navigate('/');
  };
  return (
    <div>
      <h1>Home Usuario</h1>
      <p>Hola {userInfo.nombre} {userInfo.apellido}! Eres tipo de usuario: {userInfo.tipo}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default HomeUser;
