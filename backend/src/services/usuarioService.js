const pool = require('../config/database');

const getUsuarioByEmail = async (email) => {
  const [rows] = await pool.query('SELECT * FROM Usuario WHERE email = ?', [email]);
  return rows[0];
};

const createUsuario = async (userData) => {
  const { first_name, last_name, email, password, rol } = userData;
  const [result] = await pool.query(
    'INSERT INTO Usuario (first_name, last_name, email, password, rol) VALUES (?, ?, ?, ?, ?)',
    [first_name, last_name, email, password, rol]
  );
  return result.insertId;
};

module.exports = { getUsuarioByEmail, createUsuario };
