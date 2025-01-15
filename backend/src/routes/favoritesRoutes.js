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


/**
 * @swagger
 * tags:
 *   name: Favoritos
 *   description: Endpoints para la gestión de fotografías favoritas
 */

/**
 * @swagger
 * /favoritos:
 *   post:
 *     summary: Marcar una fotografía como favorita
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *               id_object:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Fotografía marcada como favorita.
 *       500:
 *         description: Error al procesar la solicitud.
 */

/**
 * @swagger
 * /favoritos:
 *   delete:
 *     summary: Quitar una fotografía de favoritos
 *     tags: [Favoritos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: integer
 *               id_object:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Fotografía eliminada de favoritos.
 *       500:
 *         description: Error al procesar la solicitud.
 */

/**
 * @swagger
 * /favoritos/{id_user}:
 *   get:
 *     summary: Obtener las fotografías favoritas de un usuario
 *     tags: [Favoritos]
 *     parameters:
 *       - in: path
 *         name: id_user
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de fotografías favoritas.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_img:
 *                     type: integer
 *                   img_path:
 *                     type: string
 *                   exposure_time:
 *                     type: string
 *                   ISO:
 *                     type: integer
 *                   applied_processing:
 *                     type: string
 *                   state:
 *                     type: string
 *                   ID_observation:
 *                     type: integer
 *                   id_validation:
 *                     type: integer
 *       500:
 *         description: Error al procesar la solicitud.
 */
