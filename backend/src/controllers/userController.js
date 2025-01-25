const db = require('../config/database');
const jwt = require('jsonwebtoken');

// Obtener todos los usuarios
exports.getUsuarios = (req, res) => {
    db.query('SELECT * FROM Usuario', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear un usuario
exports.createUsuario = (req, res) => {
    const { first_name, last_name, email, password, rol, points, registration_date } = req.body;
    const query = 'INSERT INTO Usuario (first_name, last_name, email, password, rol, points, registration_date) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [first_name, last_name, email, password, rol, points, registration_date], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Usuario creado', id: results.insertId });
    });
};

// Obtener un usuario por ID
exports.getUsuarioById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Usuario WHERE id_user = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });
        res.json(results[0]);
    });
};

// Actualizar un usuario
exports.updateUsuario = (req, res) => {
    const { id } = req.params;
    const { first_name, last_name, email, password, rol, points } = req.body;
    const query = 'UPDATE Usuario SET first_name = ?, last_name = ?, email = ?, password = ?, rol = ?, points = ? WHERE id_user = ?';
    db.query(query, [first_name, last_name, email, password, rol, points, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario actualizado' });
    });
};

// Eliminar un usuario
exports.deleteUsuario = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Usuario WHERE id_user = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Usuario eliminado' });
    });
};

// Obtener datos del perfil del usuario autenticado
exports.getProfileData = (req, res) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id_user;

    db.query(
      "SELECT id_user, first_name, last_name, email, rol, points, registration_date FROM Usuario WHERE id_user = ?",
      [userId],
      (err, results) => {
        if (err) {
          console.error("Error al consultar la base de datos:", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }

        if (results.length === 0) {
          return res.status(404).json({ message: "Usuario no encontrado" });
        }
        
        res.json(results[0]);
      }
    );
  } catch (err) {
    console.error("Error al verificar el token:", err);
    return res.status(401).json({ message: "Token inválido o expirado" });
  }
};

