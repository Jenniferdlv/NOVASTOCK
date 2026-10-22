const mongoose = require('mongoose');

const LIMITE_POCO_STOCK = 5;

const calcularEstado = (stock) => {
  if (stock === 0) return 'AGOTADO';
  if (stock <= LIMITE_POCO_STOCK) return 'POCO_STOCK';
  return 'DISPONIBLE';
};

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del producto es obligatorio'],
    trim: true
  },
  descripcion: { type: String, trim: true },
  codigo: {
    type: String,
    required: [true, 'El código del producto es obligatorio'],
    unique: true,
    trim: true
  },
  precio: {
    type: Number,
    required: [true, 'El precio es obligatorio'],
    min: [0, 'El precio no puede ser negativo']
  },
  stock: {
    type: Number,
    required: [true, 'El stock es obligatorio'],
    default: 0,
    min: [0, 'El stock no puede ser negativo']
  },
  estado: {
    type: String,
    enum: {
      values: ['DISPONIBLE', 'POCO_STOCK', 'AGOTADO'],
      message: '{VALUE} no es un estado válido'
    },
    default: 'DISPONIBLE'
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: [true, 'La categoría es obligatoria']
  },
  ubicacion: {
    estante: { type: String, default: 'A1' },
    pasillo: { type: String, default: '1' }
  }
}, {
  timestamps: true
});

// El estado siempre se deriva del stock, en cada save()
productoSchema.pre('save', function () {
  this.estado = calcularEstado(this.stock);
});

module.exports = mongoose.model('Producto', productoSchema);