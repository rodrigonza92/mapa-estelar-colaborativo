const db = require('../config/database');

// ... (resto de las funciones)

// Marcar una fotografía como favorita
exports.markAsFavorite = (req, res) => {
    const { id_user, id_object } = req.body;
    const query = 'INSERT INTO Favoritos (id_user, id_object) VALUES (?, ?)';
    db.query(query, [id_user, id_object], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Fotografía marcada como favorita' });
    });
};

// Quitar una fotografía de favoritos
exports.removeFromFavorites = (req, res) => {
    const { id_user, id_object } = req.body;
    const query = 'DELETE FROM Favoritos WHERE id_user = ? AND id_object = ?';
    db.query(query, [id_user, id_object], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Fotografía eliminada de favoritos' });
    });
};

// Obtener las fotografías favoritas de un usuario
exports.getFavoritesByUser = (req, res) => {
    const { id_user } = req.params;
    const query = 'SELECT * FROM Fotografia WHERE ID_img IN (SELECT id_object FROM Favoritos WHERE id_user = ?)';
    db.query(query, [id_user], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json(results);
    });
};