// backend/routes/tramite.routes.js

const express = require('express');
const { protect } = require('../middleware/auth');
const upload = require('../middleware/upload');
const {
    crearTramite,
    cancelarTramite,
    getTramitesUsuario
} = require('../controllers/TramiteController');

const router = express.Router();

router.route('/')
    .post(protect, upload.single('archivo'), crearTramite)
    .get(protect, getTramitesUsuario);

router.put('/:id/cancelar', protect, cancelarTramite);

module.exports = router;