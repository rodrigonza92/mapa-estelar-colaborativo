const db = require('../config/database'); // Importar la conexión a la base de datos

exports.getFavoritos = (req, res) => {
    db.query('SELECT * FROM Favoritos', (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};

exports.createFavorito = (req, res) => {
    const { ID_user, ID_object } = req.body;

    if (!ID_user || !ID_object) {
        return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const query = 'INSERT INTO Favoritos (ID_user, ID_object) VALUES (?, ?)';
    db.query(query, [ID_user, ID_object], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Favorito agregado', id: results.insertId });
    });
};

exports.deleteFavorito = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM Favoritos WHERE id_favorite = ?', [id], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.affectedRows === 0) return res.status(404).json({ message: 'Favorito no encontrado' });
        res.json({ message: 'Favorito eliminado' });
    });
};