
process.env.JWT_SECRET = process.env.JWT_SECRET || 'test_secret';
const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');
const { login } = require('../controllers/AuthController');

const app = express();
app.use(express.json());
app.post('/api/auth/login', login);

// Configuración de test DB
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/burokratilo_test', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  await Usuario.deleteMany({});
  await Usuario.create({
    username: 'admin@correo.com',
    password: 'admin123',
    nombre: 'Admin',
    apellido: 'Administrador',
    rol: 'admin',
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('POST /api/auth/login', () => {
  it('login correcto devuelve token y datos', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@correo.com', password: 'admin123' });
    expect(res.statusCode).toBe(200);
    expect(res.body.token).toBeDefined();
    expect(res.body.username).toBe('admin@correo.com');
    expect(res.body.rol).toBe('admin');
  });

  it('login con usuario incorrecto', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'noexiste@correo.com', password: 'admin123' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Usuario no encontrado');
  });

  it('login con contraseña incorrecta', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin@correo.com', password: 'malapass' });
    expect(res.statusCode).toBe(401);
    expect(res.body.message).toBe('Credenciales inválidas');
  });
});
