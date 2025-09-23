const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.post('/', UsuarioController.crearUsuario);
router.get('/', UsuarioController.listarUsuarios);
router.put('/:id', UsuarioController.editarUsuario);
router.patch('/:id/estado', UsuarioController.cambiarEstadoUsuario);
router.delete('/:id', UsuarioController.eliminarUsuario);
router.post('/import', UsuarioController.importarUsuarios);
router.get('/export', UsuarioController.exportarUsuarios);

module.exports = router;
