const Producto = require('../models/productos');

const responderError = (res, error, mensaje) => {
  if (error.name === 'ValidationError') {
    const detalle = Object.values(error.errors).map((e) => e.message).join(', ');
    return res.status(400).json({ mensaje: detalle });
  }
  if (error.code === 11000) {
    return res.status(409).json({ mensaje: 'Ya existe un producto con ese código' });
  }
  if (error.name === 'CastError') {
    return res.status(400).json({ mensaje: 'ID inválido' });
  }
  console.error(mensaje, error.message);
  res.status(500).json({ mensaje });
};

const obtenerProductos = async (req, res) => {
  try {
    const productos = await Producto.find().populate('categoria');
    res.json(productos);
  } catch (error) {
    responderError(res, error, 'Error al obtener los productos');
  }
};

const crearProducto = async (req, res) => {
  try {
    const nuevoProducto = new Producto(req.body);
    const productoGuardado = await nuevoProducto.save();
    await productoGuardado.populate('categoria');
    res.status(201).json(productoGuardado);
  } catch (error) {
    responderError(res, error, 'Error al crear el producto');
  }
};

const actualizarProducto = async (req, res) => {
  try {
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    producto.set(req.body);
    await producto.save();
    await producto.populate('categoria');
    res.json(producto);
  } catch (error) {
    responderError(res, error, 'Error al actualizar el producto');
  }
};

const eliminarProducto = async (req, res) => {
  try {
    const eliminado = await Producto.findByIdAndDelete(req.params.id);
    if (!eliminado) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    res.json({ mensaje: 'Producto eliminado' });
  } catch (error) {
    responderError(res, error, 'Error al eliminar el producto');
  }
};

// ---- Endpoints de negocio ----

const cantidadValida = (valor) => {
  const cantidad = Number(valor);
  return Number.isInteger(cantidad) && cantidad > 0 ? cantidad : null;
};

const venderProducto = async (req, res) => {
  try {
    const cantidad = cantidadValida(req.body.cantidad);
    if (!cantidad) {
      return res.status(400).json({ mensaje: 'La cantidad debe ser un entero mayor a 0' });
    }
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    if (producto.stock < cantidad) {
      return res.status(400).json({
        mensaje: `Stock insuficiente: quedan ${producto.stock} unidades`
      });
    }
    producto.stock -= cantidad;
    await producto.save();
    await producto.populate('categoria');
    res.json(producto);
  } catch (error) {
    responderError(res, error, 'Error al registrar la venta');
  }
};

const reponerProducto = async (req, res) => {
  try {
    const cantidad = cantidadValida(req.body.cantidad);
    if (!cantidad) {
      return res.status(400).json({ mensaje: 'La cantidad debe ser un entero mayor a 0' });
    }
    const producto = await Producto.findById(req.params.id);
    if (!producto) {
      return res.status(404).json({ mensaje: 'Producto no encontrado' });
    }
    producto.stock += cantidad;
    await producto.save();
    await producto.populate('categoria');
    res.json(producto);
  } catch (error) {
    responderError(res, error, 'Error al reponer el stock');
  }
};

module.exports = {
  obtenerProductos,
  crearProducto,
  actualizarProducto,
  eliminarProducto,
  venderProducto,
  reponerProducto
};