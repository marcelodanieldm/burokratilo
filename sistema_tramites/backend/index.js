require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const app = express();
// El puerto y app.listen se gestionan en server.js

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
app.options('*', cors());
app.use(express.json());

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error de conexión:', err));

const Usuario = require('./models/Usuario');

app.get('/', (req, res) => {
  res.send('Backend funcionando y conectado a MongoDB');
});

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  try {
    const usuario = await Usuario.findOne({ username });
    if (!usuario) {
      return res.status(401).json({ error: 'Usuario no encontrado' });
    }
    const esValido = await usuario.comparePassword(password);
    if (!esValido) {
      return res.status(401).json({ error: 'Contraseña incorrecta' });
    }
    let tipo = usuario.rol || 'user';
    if (usuario.username === 'admin@email.com') {
      tipo = 'admin';
    } else if (usuario.username.endsWith('@guest.com')) {
      tipo = 'guest';
    }
    res.json({ mensaje: 'Login exitoso', tipo });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor' });
  }
});

app.post('/reset-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Falta el email' });
  }
  const usuario = await Usuario.findOne({ username: email });
  if (!usuario) {
    return res.status(404).json({ error: 'Usuario no encontrado' });
  }
  res.json({ mensaje: 'Enlace de recuperación enviado a tu correo' });
});

app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Faltan datos' });
  }
  try {
    const existe = await Usuario.findOne({ username });
    if (existe) {
      return res.status(409).json({ error: 'El usuario ya existe' });
    }
    const nuevoUsuario = new Usuario({ username, password });
    await nuevoUsuario.save();
    res.status(201).json({ mensaje: 'Usuario registrado correctamente' });
  } catch (err) {
    res.status(500).json({ error: 'Error en el servidor', detalle: err.message });
  }
});


module.exports = app;
