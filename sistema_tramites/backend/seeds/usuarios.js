// backend/seeds/usuarios.js

const mongoose = require('mongoose');
const User = require('../models/Usuario');
require('dotenv').config();

const connectDB = require('../config/db');

const usuarios = [
    { nombre: "Admin", apellido: "Admin", username: "admin@burokratilo.com", password: "123456", rol: "admin" },
    { nombre: "Solicitante Uno", apellido: "Uno", username: "sol1@burokratilo.com", password: "123456", rol: "solicitante" },
    { nombre: "Solicitante Dos", apellido: "Dos", username: "sol2@burokratilo.com", password: "123456", rol: "solicitante" },
    { nombre: "Empleado N1", apellido: "N1", username: "emp1@burokratilo.com", password: "123456", rol: "empleado_n1" },
    { nombre: "Empleado N2", apellido: "N2", username: "emp2@burokratilo.com", password: "123456", rol: "empleado_n2" },
    { nombre: "Empleado N3", apellido: "N3", username: "emp3@burokratilo.com", password: "123456", rol: "empleado_n3" },
    { nombre: "Empleado N4", apellido: "N4", username: "emp4@burokratilo.com", password: "123456", rol: "empleado_n1" },
    { nombre: "User", apellido: "User", username: "user@burokratilo.com", password: "123456", rol: "user" },
    { nombre: "Invitado", apellido: "Guest", username: "invitado@guest.com", password: "123456", rol: "guest" }
];

const insertarUsuarios = async () => {
    await connectDB();
    await User.deleteMany({});
    for (const u of usuarios) {
        const usuario = new User(u);
        await usuario.save();
    }
    console.log('✅ Usuarios insertados');
    process.exit();
};

insertarUsuarios();