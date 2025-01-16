const db = require('../config/database');

// Obtener todos los objetos
exports.getObjetos = (req, res) => {
    db.query('SELECT * FROM Objeto', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

// Crear un objeto
exports.createObjeto = (req, res) => {
    const { name, type, description } = req.body;
    const query = 'INSERT INTO Objeto (name, type, description) VALUES (?, ?, ?)';
    db.query(query, [name, type, description], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Objeto creado', id: results.insertId });
    });
};

// Obtener un objeto por ID
exports.getObjetoById = (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM Objeto WHERE id_object = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(404).json({ message: 'Objeto no encontrado' });
        res.json(results[0]);
    });
};

// Actualizar un objeto
exports.updateObjeto = (req, res) => {
    const { id } = req.params;
    const { name, type, description } = req.body;
    const query = 'UPDATE Objeto SET name = ?, type = ?, description = ? WHERE id_object = ?';
    db.query(query, [name, type, description, id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Objeto actualizado' });
    });
};

// Eliminar un objeto
exports.deleteObjeto = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Objeto WHERE id_object = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Objeto eliminado' });
    });
};


