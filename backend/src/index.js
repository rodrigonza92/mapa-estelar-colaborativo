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
const userRoutes = require('./routes/userRoutes');
const objectRoutes = require('./routes/objectRoutes');
const observationRoutes = require('./routes/observationRoutes');
const photographyRoutes = require('./routes/photographyRoutes');
const validateRoutes = require('./routes/validateRoutes');
const favoritesRoutes = require('./routes/favoritesRoutes');

const setupSwagger = require('./swagger');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/usuarios', userRoutes);
app.use('/objetos', objectRoutes);
app.use('/observaciones', observationRoutes);
app.use('/fotografias', photographyRoutes);
app.use('/validar', validateRoutes);
app.use('/favoritos', favoritesRoutes);

setupSwagger(app);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));


