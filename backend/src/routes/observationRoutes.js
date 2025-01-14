const express = require('express');
const router = express.Router();
const observacionController = require('../controllers/observationController');

// Rutas para Observación
router.get('/', observacionController.getObservaciones);
router.post('/', observacionController.createObservacion);
router.get('/:id', observacionController.getObservacionById);
router.put('/:id', observacionController.updateObservacion);
router.delete('/:id', observacionController.deleteObservacion);

module.exports = router;


/**
 * @swagger
 * /observaciones:
 *   get:
 *     summary: Obtener todas las observaciones
 *     tags: [Observaciones]
 *     responses:
 *       200:
 *         description: Lista de observaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_observacion:
 *                     type: integer
 *                     description: ID de la observación
 *                   date:
 *                     type: string
 *                     format: date
 *                     description: Fecha de la observación
 *                   location:
 *                     type: string
 *                     description: Ubicación de la observación
 *                   description:
 *                     type: string
 *                     description: Descripción de la observación
 */

/**
 * @swagger
 * /observaciones:
 *   post:
 *     summary: Crear una nueva observación
 *     tags: [Observaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la observación
 *               location:
 *                 type: string
 *                 description: Ubicación de la observación
 *               description:
 *                 type: string
 *                 description: Descripción de la observación
 *               id_user:
 *                 type: integer
 *                 description: ID del usuario
 *               id_objeto:
 *                 type: integer
 *                 description: ID del objeto observado
 *     responses:
 *       201:
 *         description: Observación creada exitosamente
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /observaciones/{id}:
 *   get:
 *     summary: Obtener una observación por ID
 *     tags: [Observaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la observación
 *     responses:
 *       200:
 *         description: Observación encontrada
 *       404:
 *         description: Observación no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /observaciones/{id}:
 *   put:
 *     summary: Actualizar una observación por ID
 *     tags: [Observaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la observación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date
 *                 description: Fecha de la observación
 *               location:
 *                 type: string
 *                 description: Ubicación de la observación
 *               description:
 *                 type: string
 *                 description: Descripción de la observación
 *               id_user:
 *                 type: integer
 *                 description: ID del usuario
 *               id_objeto:
 *                 type: integer
 *                 description: ID del objeto observado
 *     responses:
 *       200:
 *         description: Observación actualizada exitosamente
 *       404:
 *         description: Observación no encontrada
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /observaciones/{id}:
 *   delete:
 *     summary: Eliminar una observación por ID
 *     tags: [Observaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la observación
 *     responses:
 *       200:
 *         description: Observación eliminada exitosamente
 *       404:
 *         description: Observación no encontrada
 *       500:
 *         description: Error del servidor
 */