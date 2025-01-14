const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { getUsuarioByEmail, createUsuario } = require('../services/usuarioService');

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUsuarioByEmail(email);
    if (!user) return res.status(404).send('Usuario no encontrado.');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Contraseña incorrecta.');

    const token = jwt.sign({ id_user: user.id_user, rol: user.rol }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.send({ token });
  } catch (err) {
    res.status(500).send('Error al procesar la solicitud.');
  }
};

const register = async (req, res) => {
  const { first_name, last_name, email, password, rol } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUsuario({ first_name, last_name, email, password: hashedPassword, rol });
    res.status(201).send({ id: userId, message: 'Usuario creado exitosamente.' });
  } catch (err) {
    res.status(500).send('Error al procesar la solicitud.');
  }
};

module.exports = { login, register };
