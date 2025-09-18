// backend/seeds/usuarios.js

const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

const connectDB = require('../config/db');

const usuarios = [
    { nombre: "Admin", email: "admin@burokratilo.com", password: "123456", rol: "admin" },
    { nombre: "Solicitante Uno", email: "sol1@burokratilo.com", password: "123456", rol: "solicitante" },
    { nombre: "Empleado N1", email: "emp1@burokratilo.com", password: "123456", rol: "empleado_n1" },
    { nombre: "Empleado N2", email: "emp2@burokratilo.com", password: "123456", rol: "empleado_n2" },
    { nombre: "Empleado N3", email: "emp3@burokratilo.com", password: "123456", rol: "empleado_n3" }
];

const insertarUsuarios = async () => {
    await connectDB();
    await User.deleteMany({});
    await User.insertMany(usuarios);
    console.log('✅ Usuarios insertados');
    process.exit();
};

insertarUsuarios();