const express = require('express');
const { 
  getValidaciones, 
  createValidacion 
} = require('../controllers/validateController');

const router = express.Router();
router.get('/', getValidaciones);
router.post('/', createValidacion);

module.exports = router;


/**
 * @swagger
 * tags:
 *   name: Validaciones
 *   description: Endpoints para la gestión de validaciones
 */

/**
 * @swagger
 * /validaciones:
 *   get:
 *     summary: Obtener todas las validaciones
 *     tags: [Validaciones]
 *     responses:
 *       200:
 *         description: Lista de todas las validaciones.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   ID_validacion:
 *                     type: integer
 *                   score:
 *                     type: integer
 *                   comments:
 *                     type: string
 *                   ID_validador:
 *                     type: integer
 */

/**
 * @swagger
 * /validaciones:
 *   post:
 *     summary: Crear una nueva validación
 *     tags: [Validaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               score:
 *                 type: integer
 *               comments:
 *                 type: string
 *               ID_validador:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Validación creada exitosamente.
 *       400:
 *         description: Faltan campos requeridos.
 *       500:
 *         description: Error al procesar la solicitud.
 */
