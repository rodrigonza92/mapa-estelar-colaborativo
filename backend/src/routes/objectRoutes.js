const express = require('express');
const router = express.Router();
const objetoController = require('../controllers/objectController');

// Rutas para Objeto
router.get('/', objetoController.getObjetos);
router.post('/', objetoController.createObjeto);
router.get('/:id', objetoController.getObjetoById);
router.put('/:id', objetoController.updateObjeto);
router.delete('/:id', objetoController.deleteObjeto);

module.exports = router;

/**
 * @swagger
 * /objetos:
 *   get:
 *     summary: Obtener todos los objetos
 *     tags: [Objetos]
 *     responses:
 *       200:
 *         description: Lista de objetos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id_objeto:
 *                     type: integer
 *                     description: ID del objeto
 *                   name:
 *                     type: string
 *                     description: Nombre del objeto
 *                   type:
 *                     type: string
 *                     description: Tipo de objeto
 *                   description:
 *                     type: string
 *                     description: Descripción del objeto
 */

/**
 * @swagger
 * /objetos:
 *   post:
 *     summary: Crear un nuevo objeto
 *     tags: [Objetos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del objeto
 *               type:
 *                 type: string
 *                 description: Tipo del objeto
 *               description:
 *                 type: string
 *                 description: Descripción del objeto
 *     responses:
 *       201:
 *         description: Objeto creado exitosamente
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /objetos/{id}:
 *   get:
 *     summary: Obtener un objeto por ID
 *     tags: [Objetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del objeto
 *     responses:
 *       200:
 *         description: Objeto encontrado
 *       404:
 *         description: Objeto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /objetos/{id}:
 *   put:
 *     summary: Actualizar un objeto por ID
 *     tags: [Objetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del objeto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nombre del objeto
 *               type:
 *                 type: string
 *                 description: Tipo del objeto
 *               description:
 *                 type: string
 *                 description: Descripción del objeto
 *     responses:
 *       200:
 *         description: Objeto actualizado exitosamente
 *       404:
 *         description: Objeto no encontrado
 *       500:
 *         description: Error del servidor
 */

/**
 * @swagger
 * /objetos/{id}:
 *   delete:
 *     summary: Eliminar un objeto por ID
 *     tags: [Objetos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del objeto
 *     responses:
 *       200:
 *         description: Objeto eliminado exitosamente
 *       404:
 *         description: Objeto no encontrado
 *       500:
 *         description: Error del servidor
 */