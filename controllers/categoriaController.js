const Categoria = require('../models/categorias');

const obtenerCategorias = async (req, res) => {
  try {
    const categorias = await Categoria.find();
    res.json(categorias);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener las categorías' });
  }
};

const crearCategoria = async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json(categoriaGuardada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al crear la categoría', error: error.message });
  }
};

const actualizarCategoria = async (req, res) => {
  try {
    const { id } = req.params;
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id, 
      req.body, 
      { returnDocument: 'after', runValidators: true }
    );

    if (!categoriaActualizada) {
      return res.status(404).json({ mensaje: 'Categoría no encontrada' });
    }

    res.json(categoriaActualizada);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar la categoría', error: error.message });
  }
};

module.exports = {
  obtenerCategorias,crearCategoria,actualizarCategoria
};