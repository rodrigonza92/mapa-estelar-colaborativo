const db = require('../config/database'); // Importar la conexión a la base de datos

exports.getValidaciones = (req, res) => {
    db.query('SELECT * FROM Validacion', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createValidacion = (req, res) => {
    const { score, comments, ID_validador } = req.body;

    if (!score || !ID_validador) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const query = 'INSERT INTO Validacion (score, comments, ID_validador) VALUES (?, ?, ?)';
    db.query(query, [score, comments, ID_validador], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Validación creada', id: results.insertId });
    });
};