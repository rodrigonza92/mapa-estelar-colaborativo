const db = require('../config/database');

// Obtener un usuario por email
const getUsuarioByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM Usuario WHERE email = ?';
    db.query(query, [email], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results[0]);
    });
  });
};

// Crear un usuario
const createUsuario = (user) => {
  return new Promise((resolve, reject) => {
    const query = `
      INSERT INTO Usuario (first_name, last_name, email, password, rol)
      VALUES (?, ?, ?, ?, ?)
    `;
    const { first_name, last_name, email, password, rol } = user;
    db.query(
      query,
      [first_name, last_name, email, password, rol],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results.insertId);
      }
    );
  });
};

module.exports = { getUsuarioByEmail, createUsuario };
