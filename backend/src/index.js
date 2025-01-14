const pool = require('./config/database');

(async () => {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos exitosa.');
    connection.release();
  } catch (err) {
    console.error('Error al conectar con la base de datos:', err);
  }
})();


const express = require('express');
const authRoutes = require('./routes/authRoutes');

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en el puerto ${PORT}`));
