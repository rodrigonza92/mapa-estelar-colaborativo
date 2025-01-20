const express = require('express');
const { 
  getValidaciones, 
  createValidacion 
} = require('../controllers/validateController');

const router = express.Router();
router.get('/', getValidaciones);
router.post('/', createValidacion);

module.exports = router;
