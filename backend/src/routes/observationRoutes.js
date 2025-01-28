const express = require('express');
const router = express.Router();
const observacionController = require('../controllers/observationController');

router.get('/user', observacionController.getObservacionByUser);

router.get('/', observacionController.getObservaciones);
router.post('/', observacionController.createObservacion);
router.get('/:id', observacionController.getObservacionById);
router.put('/:id', observacionController.updateObservacion);
router.delete('/:id', observacionController.deleteObservacion);

module.exports = router;

