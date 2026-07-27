const Categoria = require('../models/categorias');

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las categorías', error: error.message });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevaCategoria = new Categoria({ nombre, descripcion });
    await nuevaCategoria.save();
    
    res.status(201).json({
      mensaje: 'Categoría creada con éxito',
      categoria: nuevaCategoria
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear la categoría', error: error.message });
  }
};

module.exports = {
  obtenerCategorias,
  crearCategoria
};