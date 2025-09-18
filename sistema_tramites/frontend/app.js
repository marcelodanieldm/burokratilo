import BienvenidaView from './BienvenidaView';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeAdminView from './HomeAdminView';
import HomeUserView from './HomeUserView';
import HomeEmpleadoN1View from './HomeEmpleadoN1View';
import HomeGuestView from './HomeGuestView';
import HomeSolicitanteView from './HomeSolicitanteView';
import LoginView from './LoginView';
import RegisterView from './RegisterView';

function login(email, password) {
    fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    })
    .then(response => response.json().then(data => ({ ok: response.ok, data })))
    .then(({ ok, data }) => {
        if (ok) {
            localStorage.setItem('userInfo', JSON.stringify(data));
            window.currentUser = data;
            if (data.tipo === 'admin') {
                window.location.href = '/home-admin';
            } else if (data.tipo === 'empleado_n1') {
                window.location.href = '/home-empleado-n1';
            } else if (data.tipo === 'user') {
                window.location.href = '/home-user';
            } else {
                window.location.href = '/home-guest';
            }
        } else {
            alert(data.message);
        }
    })
    .catch(error => {
        console.error(error);
        alert('Error en el servidor');
    });
}

function ProtectedRoute({ element: Element, tipo }) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    if (!userInfo || (tipo && userInfo.tipo !== tipo)) {
        window.location.href = '/login';
        return null;
    }
    return <Element />;
}

function App() {
    return (
        <Router>
                    <Routes>
                        <Route path="/" element={<BienvenidaView />} />
                <Route path="/login" element={<LoginView onLogin={login} />} />
                <Route path="/register" element={<RegisterView />} />
                <Route path="/home-admin" element={<ProtectedRoute element={HomeAdminView} tipo="admin" />} />
                <Route path="/home-user" element={<ProtectedRoute element={HomeUserView} tipo="user" />} />
                <Route path="/home-empleado-n1" element={<ProtectedRoute element={HomeEmpleadoN1View} tipo="empleado_n1" />} />
                <Route path="/home-solicitante" element={<ProtectedRoute element={HomeSolicitanteView} tipo="solicitante" />} />
                <Route path="/home-guest" element={<ProtectedRoute element={HomeGuestView} tipo="guest" />} />
                {/* Puedes agregar una ruta principal o de bienvenida aquí */}
            </Routes>
        </Router>
    );
}

export default App;