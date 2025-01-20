const express = require('express');
const { 
  getFotografias, 
  createFotografia, 
  getFotografiaById, 
  updateFotografia, 
  deleteFotografia 
} = require('../controllers/photographyController');

const router = express.Router();

router.get('/', getFotografias);
router.post('/', createFotografia);
router.get('/:id', getFotografiaById);
router.put('/:id', updateFotografia);
router.delete('/:id', deleteFotografia);

module.exports = router;
