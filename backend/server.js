/**
 * Artesano Digital - Servidor principal
 * Configuración y arranque del servidor Express
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const errorMiddleware = require('./middlewares/error.middleware');

// Importación de rutas
const usuariosRouter = require('./API/usuarios.route');
const productosRouter = require('./API/productos.route');
// const pedidosRouter = require('./API/pedidos.route');
// const categoriasRouter = require('./API/categorias.route');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
// app.use('/api/pedidos', pedidosRouter);
// app.use('/api/categorias', categoriasRouter);

// Ruta base
app.get('/', (req, res) => {
  res.json({ message: 'Bienvenido a la API de Artesano Digital' });
});

// Middleware de manejo de errores
app.use(errorMiddleware);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
