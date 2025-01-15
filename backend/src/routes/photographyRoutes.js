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

/**
 * @swagger
 * tags:
 *   name: Fotografias
 *   description: Endpoints para la gestión de fotografías
 */

/**
 * @swagger
 * /fotografias:
 *   get:
 *     summary: Obtener todas las fotografías
 *     tags: [Fotografias]
 *     responses:
 *       200:
 *         description: Lista de todas las fotografías.
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
 */

/**
 * @swagger
 * /fotografias:
 *   post:
 *     summary: Crear una nueva fotografía
 *     tags: [Fotografias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img_path:
 *                 type: string
 *               exposure_time:
 *                 type: string
 *               ISO:
 *                 type: integer
 *               applied_processing:
 *                 type: string
 *               state:
 *                 type: string
 *               ID_observation:
 *                 type: integer
 *               id_validation:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Fotografía creada exitosamente.
 *       400:
 *         description: Faltan campos requeridos.
 *       500:
 *         description: Error al procesar la solicitud.
 */

/**
 * @swagger
 * /fotografias/{id}:
 *   get:
 *     summary: Obtener una fotografía por ID
 *     tags: [Fotografias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fotografía
 *     responses:
 *       200:
 *         description: Detalles de la fotografía.
 *       404:
 *         description: Fotografía no encontrada.
 *       500:
 *         description: Error al procesar la solicitud.
 */

/**
 * @swagger
 * /fotografias/{id}:
 *   put:
 *     summary: Actualizar una fotografía por ID
 *     tags: [Fotografias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fotografía
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               img_path:
 *                 type: string
 *               exposure_time:
 *                 type: string
 *               ISO:
 *                 type: integer
 *               applied_processing:
 *                 type: string
 *               state:
 *                 type: string
 *               ID_observation:
 *                 type: integer
 *               id_validation:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Fotografía actualizada exitosamente.
 *       400:
 *         description: Faltan campos requeridos.
 *       404:
 *         description: Fotografía no encontrada.
 *       500:
 *         description: Error al procesar la solicitud.
 */

/**
 * @swagger
 * /fotografias/{id}:
 *   delete:
 *     summary: Eliminar una fotografía por ID
 *     tags: [Fotografias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la fotografía
 *     responses:
 *       200:
 *         description: Fotografía eliminada exitosamente.
 *       404:
 *         description: Fotografía no encontrada.
 *       500:
 *         description: Error al procesar la solicitud.
 */