const express = require('express');
const router = express.Router();
const { obtenerCategorias, crearCategoria } = require('../controllers/categoriaController');

router.get('/categorias', obtenerCategorias);

router.post('/categorias', crearCategoria);

module.exports = router;