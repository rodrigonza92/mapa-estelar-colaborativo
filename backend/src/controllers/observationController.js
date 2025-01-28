const db = require('../config/database');
const jwt = require("jsonwebtoken");

// Obtener todas las observaciones
exports.getObservaciones = (req, res) => {
    db.query('SELECT * FROM Observacion', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear una observación
exports.createObservacion = (req, res) => {
    const { date, location, description, id_user, id_objeto } = req.body;
    const query = 'INSERT INTO Observacion (date, location, description, id_user, id_object) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [date, location, description, id_user, id_objeto], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Observación creada', id: results.insertId });
    });
};

// Obtener una observación por ID
exports.getObservacionById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Observacion WHERE id_observation = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Observación no encontrada' });
        res.json(results[0]);
    });
};

// Actualizar una observación
exports.updateObservacion = (req, res) => {
    const { id } = req.params;
    const { date, location, description, id_user, id_objeto } = req.body;
    const query = 'UPDATE Observacion SET date = ?, location = ?, description = ?, id_user = ?, id_object = ? WHERE id_observation = ?';
    db.query(query, [date, location, description, id_user, id_objeto, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Observación actualizada' });
    });
};

// Eliminar una observación
exports.deleteObservacion = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Observacion WHERE id_observation = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Observación eliminada' });
    });
};

// Obtener una observación por ID de Usuario
exports.getObservacionByUser = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id_user;
  
      const query = "SELECT * FROM Observacion WHERE id_user = ?";
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error("Error al consultar la base de datos:", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
  
        if (results.length === 0) {
          return res.status(404).json({ message: "No se encontraron observaciones para este usuario" });
        }
  
        res.json(results);
      });
    } catch (err) {
      console.error("Error al verificar el token:", err);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
  };