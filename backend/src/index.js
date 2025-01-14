require('dotenv').config();

const db = require('./config/database');

(async () => {
  try {
    console.log('Conexión a la base de datos exitosa.');
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
  }
})();

const express = require('express');
const authRoutes = require('./routes/authRoutes');
const usuarioRoutes = require('./routes/userRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


const setupSwagger = require('./swagger');
setupSwagger(app);