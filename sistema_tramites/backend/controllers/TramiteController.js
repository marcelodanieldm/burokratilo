// backend/controllers/TramiteController.js

const Tramite = require('../models/Tramite');
const User = require('../models/User');
const fs = require('fs');

// @desc    Crear trámite
// @route   POST /api/tramites
const crearTramite = async (req, res) => {
    const { tipo, comentarios } = req.body;
    const archivo = req.file ? req.file.filename : null;

    try {
        // Generar ID único
        const prefijo = tipo.substring(0, 3).toUpperCase();
        const ultimoTramite = await Tramite.findOne().sort({ _id: -1 });
        const numero = ultimoTramite ? parseInt(ultimoTramite.id.split('-')[1]) + 1 : 1;
        const id = `${prefijo}-${String(numero).padStart(3, '0')}`;

        // Asignar empleado N1 aleatorio
        const empleadosN1 = await User.find({ rol: 'empleado_n1' });
        const responsableId = empleadosN1.length > 0 ?
            empleadosN1[Math.floor(Math.random() * empleadosN1.length)]._id : null;

        const nuevoTramite = new Tramite({
            id,
            tipo,
            comentarios,
            archivo,
            estado: 'enviado',
            solicitanteId: req.user.id,
            responsableId
        });

        const tramiteGuardado = await nuevoTramite.save();
        res.status(201).json(tramiteGuardado);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Cancelar trámite
// @route   PUT /api/tramites/:id/cancelar
const cancelarTramite = async (req, res) => {
    try {
        const tramite = await Tramite.findOne({ id: req.params.id, solicitanteId: req.user.id });

        if (!tramite) {
            return res.status(404).json({ message: 'Trámite no encontrado' });
        }

        tramite.estado = 'cancelado';
        await tramite.save();

        res.json(tramite);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Obtener trámites del usuario logueado
// @route   GET /api/tramites
const getTramitesUsuario = async (req, res) => {
    try {
        const { estado, id, tipo, fechaDesde, fechaHasta, nombreApellido } = req.query;

        let query = { solicitanteId: req.user.id };

        if (estado) query.estado = estado;
        if (id) query.id = { $regex: id, $options: 'i' };
        if (tipo) query.tipo = { $regex: tipo, $options: 'i' };
        if (fechaDesde || fechaHasta) {
            query.fechaCreacion = {};
            if (fechaDesde) query.fechaCreacion.$gte = new Date(fechaDesde);
            if (fechaHasta) query.fechaCreacion.$lte = new Date(fechaHasta);
        }

        let tramites = await Tramite.find(query).populate('responsableId', 'nombre rol');

        // Si se busca por nombreApellido, filtramos por nombre del solicitante
        if (nombreApellido) {
            const usuarios = await User.find({
                $or: [
                    { nombre: { $regex: nombreApellido, $options: 'i' } }
                ]
            }).select('_id');
            const ids = usuarios.map(u => u._id);
            tramites = tramites.filter(t => ids.includes(t.solicitanteId.toString()));
        }

        // Agregamos propiedades virtuales y métodos
        tramites = tramites.map(t => {
            t = t.toObject(); // Convertimos a objeto plano
            t.diasTranscurridos = Math.ceil((new Date() - t.fechaCreacion) / (1000 * 60 * 60 * 24));
            t.colorAntiguedad = getColorPorAntiguedad(t.diasTranscurridos);
            return t;
        });

        res.json(tramites);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

function getColorPorAntiguedad(dias) {
    if (dias <= 2) return "#4CAF50";
    if (dias <= 5) return "#FFC107";
    return "#F44336";
}

module.exports = {
    crearTramite,
    cancelarTramite,
    getTramitesUsuario
};