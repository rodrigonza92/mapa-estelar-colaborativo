const db = require('../config/database');
const jwt = require("jsonwebtoken");

// Marcar un objeto como favorita
exports.markAsFavorite = (req, res) => {
    const { id_object } = req.body;

    const token = req.headers.authorization && req.headers.authorization.split(' ')[1]

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Token inválido o expirado' });
        }

        const id_user = decoded.id_user;

        const query = 'INSERT INTO Favoritos ( id_object, id_user) VALUES (?, ?)';
        db.query(query, [ id_object, id_user,], (err, results) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Objeto agregado a favoritos' });
        });
    });
};

// Quitar un objeto de favoritos
exports.removeFromFavorites = (req, res) => {
    const { id_user, id_object } = req.body;
    const query = 'DELETE FROM Favoritos WHERE id_user = ? AND id_object = ?';
    db.query(query, [id_user, id_object], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: 'Objeto eliminada de favoritos' });
    });
};

// Obtener las fotografías favoritas de un usuario
exports.getFavoritesByUser = (req, res) => {
    const token = req.headers.authorization && req.headers.authorization.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const userId = decoded.id_user;

      const query = "SELECT Objeto.oficial_name, Objeto.alternative_name, Objeto.object_type, Objeto.constellation, Objeto.visibility_season, Objeto.coordinates, Objeto.apparent_magnitude FROM Favoritos INNER JOIN Objeto ON Favoritos.id_object = Objeto.id_object WHERE Favoritos.id_user = ?";
      db.query(query, [userId], (err, results) => {
        if (err) {
          console.error("Error al consultar la base de datos:", err);
          return res.status(500).json({ error: "Error interno del servidor" });
        }
  
        res.json(results);
      });
    } catch (err) {
      console.error("Error al verificar el token:", err);
      return res.status(401).json({ message: "Token inválido o expirado" });
    }
};