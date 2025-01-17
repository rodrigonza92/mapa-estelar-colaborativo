const express = require('express');
const router = express.Router();
const objetoController = require('../controllers/objectController');

router.get('/', objetoController.getObjetos);
router.post('/', objetoController.createObjeto);
router.get('/:id', objetoController.getObjetoById);
router.put('/:id', objetoController.updateObjeto);
router.delete('/:id', objetoController.deleteObjeto);

module.exports = router;
