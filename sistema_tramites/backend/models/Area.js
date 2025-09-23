const mongoose = require('mongoose');

const areaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Area' },
  subareas: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Area' }]
});

module.exports = mongoose.model('Area', areaSchema);
