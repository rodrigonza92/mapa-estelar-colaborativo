const express = require('express');
const { login, register } = require('../controllers/authController');
const db = require('../config/database');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);

// Endpoint de prueba
// router.get('/test-db', (req, res) => {
//     db.query('SELECT 1 + 1 AS result', (err, results) => {
//         if (err) {
//             return res.status(500).json({ error: 'Error en la conexión a la base de datos' });
//         }
//         res.json({ message: 'Conexión exitosa', result: results[0].result });
//     });
// });

module.exports = router;
