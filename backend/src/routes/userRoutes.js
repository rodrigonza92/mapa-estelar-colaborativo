const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/userController');

// Rutas para Usuario
router.get('/', usuarioController.getUsuarios);
router.post('/', usuarioController.createUsuario);
router.get('/:id', usuarioController.getUsuarioById);
router.put('/:id', usuarioController.updateUsuario);
router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;


/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     summary: Obtiene todos los usuarios
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     summary: Obtiene un usuario por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
