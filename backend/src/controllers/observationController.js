const db = require('../config/database');

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
    const query = 'INSERT INTO Observacion (date, location, description, id_user, id_objeto) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [date, location, description, id_user, id_objeto], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Observación creada', id: results.insertId });
    });
};

// Obtener una observación por ID
exports.getObservacionById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Observacion WHERE id_observacion = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Observación no encontrada' });
        res.json(results[0]);
    });
};

// Actualizar una observación
exports.updateObservacion = (req, res) => {
    const { id } = req.params;
    const { date, location, description, id_user, id_objeto } = req.body;
    const query = 'UPDATE Observacion SET date = ?, location = ?, description = ?, id_user = ?, id_objeto = ? WHERE id_observacion = ?';
    db.query(query, [date, location, description, id_user, id_objeto, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Observación actualizada' });
    });
};

// Eliminar una observación
exports.deleteObservacion = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Observacion WHERE id_observacion = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Observación eliminada' });
    });
};


