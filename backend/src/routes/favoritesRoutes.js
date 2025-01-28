const express = require('express');
const router = express.Router();
const favoritosController = require('../controllers/favoritesController');

router.get('/', favoritosController.getFavoritesByUser);
router.post('/', favoritosController.markAsFavorite);
router.delete('/', favoritosController.removeFromFavorites);

module.exports = router;

