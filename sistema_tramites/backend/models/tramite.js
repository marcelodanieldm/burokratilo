// backend/models/Tramite.js

const mongoose = require('mongoose');

const tramiteSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Ej: "PER-001"
    tipo: { type: String, required: true },
    comentarios: { type: String, required: true },
    archivo: { type: String }, // ruta del archivo guardado
    estado: {
        type: String,
        enum: ['enviado', 'cancelado', 'en_progreso', 'finalizado', 'rechazado'],
        default: 'enviado'
    },
    solicitanteId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    responsableId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    fechaCreacion: { type: Date, default: Date.now }
});

// Método virtual para calcular días transcurridos
tramiteSchema.virtual('diasTranscurridos').get(function() {
    const hoy = new Date();
    const diffTime = Math.abs(hoy - this.fechaCreacion);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
});

// Método para obtener color
tramiteSchema.methods.getColorPorAntiguedad = function() {
    const dias = this.diasTranscurridos;
    if (dias <= 2) return "#4CAF50";
    if (dias <= 5) return "#FFC107";
    return "#F44336";
};

module.exports = mongoose.model('Tramite', tramiteSchema);