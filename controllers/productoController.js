const Producto = require('../models/productos');

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.status(200).json(productos);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener los productos', error: error.message });
  }
};

const crearProducto = async (req, res) => {
  try {
    const { nombre, descripcion, precio, stock, categoria } = req.body;
    const nuevoProducto = new Producto({
      nombre,
      descripcion,
      precio,
      stock,
      categoria
    });
    
    await nuevoProducto.save();
    
    res.status(201).json({
      mensaje: 'Producto creado con éxito',
      producto: nuevoProducto
    });
  } catch (error) {
    res.status(400).json({ mensaje: 'Error al crear el producto', error: error.message });
  }
};

module.exports = {
  obtenerProductos,
  crearProducto
};