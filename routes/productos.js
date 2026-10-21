const express = require('express');
const router = express.Router();
const {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  venderProducto,
  reponerProducto
} = require('../controllers/productoController');

router.get('/productos', obtenerProductos);
router.post('/productos', crearProducto);
router.put('/productos/:id', actualizarProducto);
router.delete('/productos/:id', eliminarProducto);
router.put('/productos/:id/vender', venderProducto);
router.put('/productos/:id/reponer', reponerProducto);

module.exports = router;