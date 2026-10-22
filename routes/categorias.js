const express = require('express');
const router = express.Router();
const { 
  obtenerCategorias, 
  crearCategoria, 
  actualizarCategoria 
} = require('../controllers/categoriaController');

router.get('/categorias', obtenerCategorias);
router.post('/categorias', crearCategoria);
router.put('/categorias/:id', actualizarCategoria);

module.exports = router;