const express = require('express');

const { 
  markAsFavorite, 
  removeFromFavorites, 
  getFavoritesByUser 
} = require('../controllers/favoritesController');

const router = express.Router();
router.post('/', markAsFavorite);
router.delete('/', removeFromFavorites);
router.get('/:id_user', getFavoritesByUser);

module.exports = router;

