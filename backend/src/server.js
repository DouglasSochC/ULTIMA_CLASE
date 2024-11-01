const express = require('express');
const app = express();
const productoRoutes = require('./producto');
const port = 3001;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Montar las rutas en el servidor
app.use('/productos', productoRoutes);

// Manejo de ruta cuando no se encuentra la ruta solicitada
app.use((req, res) => {
  res.status(404).send({ message: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`);
});