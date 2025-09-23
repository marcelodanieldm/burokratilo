const express = require('express');
const router = express.Router();
const AreaController = require('../controllers/AreaController');

router.post('/', AreaController.crearArea);
router.get('/', AreaController.listarAreas);
router.put('/:id', AreaController.editarArea);
router.delete('/:id', AreaController.eliminarArea);
router.post('/import-organigrama', AreaController.importarOrganigrama);

module.exports = router;
