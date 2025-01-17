const db = require('../config/database');

// CONTROLADOR PARA FOTOGRAFÍA
exports.getFotografias = (req, res) => {
    db.query('SELECT * FROM Fotografia', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createFotografia = (req, res) => {
    const { img_path, exposure_time, ISO, applied_processing, state, ID_observation, id_validation } = req.body;

    if (!img_path || !exposure_time || !ISO || !ID_observation) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const query = 'INSERT INTO Fotografia (img_path, exposure_time, ISO, applied_processing, state, id_observation, id_validation) VALUES (?, ?, ?, ?, ?, ?, ?)';
    db.query(query, [img_path, exposure_time, ISO, applied_processing, state, ID_observation, id_validation], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Fotografía creada', id: results.insertId });
    });
};

exports.getFotografiaById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Fotografia WHERE id_img = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Fotografía no encontrada' });
        res.json(results[0]);
    });
};

exports.updateFotografia = (req, res) => {
    const { id } = req.params;
    const { img_path, exposure_time, ISO, applied_processing, state, id_observation, id_validation } = req.body;

    if (!img_path || !exposure_time || !ISO || !id_observation) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const query = 'UPDATE Fotografia SET img_path = ?, exposure_time = ?, ISO = ?, applied_processing = ?, state = ?, id_observation = ?, id_validation = ? WHERE id_img = ?';
    db.query(query, [img_path, exposure_time, ISO, applied_processing, state, id_observation, id_validation, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Fotografía no encontrada' });
        res.json({ message: 'Fotografía actualizada' });
    });
};

exports.deleteFotografia = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Fotografia WHERE id_img = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Fotografía no encontrada' });
        res.json({ message: 'Fotografía eliminada' });
    });
};