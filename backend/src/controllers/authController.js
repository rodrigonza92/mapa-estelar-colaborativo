const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUsuarioByEmail, createUsuario } = require('../services/usuarioService');

const login = async (req, res) => {
  const { email, password } = req.body;

  // Validación inicial
  if (!email || !password) {
    return res.status(400).send('Email y contraseña son requeridos.');
  }

  try {
    const user = await getUsuarioByEmail(email);
    if (!user) return res.status(404).send('Usuario no encontrado.');

    const newHash = await bcrypt.hash(password, 10);
    const validPassword = await bcrypt.compare(password, newHash);

    if (!validPassword) return res.status(400).send('Contraseña incorrecta.');

    const token = jwt.sign(
      { id_user: user.id_user, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.send({ token });
  } catch (err) {
    console.error('Error en login:', err);
    res.status(500).send('Error al procesar la solicitud.');
  }
};

const register = async (req, res) => {
  const { first_name, last_name, email, password, rol } = req.body;

  // Validación inicial
  if (!first_name || !last_name || !email || !password || !rol) {
    return res.status(400).send('Todos los campos son requeridos.');
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUsuario({ first_name, last_name, email, password: hashedPassword, rol });

    res.status(201).send({ id: userId, message: 'Usuario creado exitosamente.' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      return res.status(400).send('El correo electrónico ya está registrado.');
    }
    console.error('Error en registro:', err);
    res.status(500).send('Error al procesar la solicitud.');
  }
};

module.exports = { login, register };
