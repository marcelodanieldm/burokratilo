const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const usuarioSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    match: [/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Debe ser una dirección de email válida']
  },
  password: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  rol: { type: String, required: true }
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

usuarioSchema.methods.comparePassword = function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('Usuario', usuarioSchema);
