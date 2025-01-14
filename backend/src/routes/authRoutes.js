const express = require('express');
const { login, register } = require('../controllers/authController');
const db = require('../config/database');
const router = express.Router();

router.post('/login', login);
router.post('/register', register);

module.exports = router;
