require('dotenv').config();
const express = require('express');
const cors = require('cors');
const corsOptions = require('./config/corsOptions');
const dbconnect = require('./config/db');
const categoriasRoutes = require('./routes/categorias');
const productosRoutes = require('./routes/productos');

const app = express();

app.use(cors(corsOptions));
app.use(express.json());
app.use(categoriasRoutes);
app.use(productosRoutes);

const PORT = process.env.PORT || 3000;

dbconnect().then(() => {
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
});