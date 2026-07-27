const mongoose = require('mongoose');

const productoSchema = new mongoose.Schema({
  nombre: {
    type: String, required: [true, 'El nombre del producto es obligatorio'], trim: true
  },
  codigo: { type: String, required: [true, 'El código del producto es obligatorio'], unique: true, trim: true
  },
  precio: { type: Number, required: [true, 'El precio es obligatorio'], min: [0, 'El precio no puede ser negativo']
  },
  stock: { type: Number, required: [true, 'El stock es obligatorio'], default: 0, min: [0, 'El stock no puede ser negativo']
  },
  
  
  estado: { type: String, enum: { values: ['DISPONIBLE', 'POCO_STOCK', 'AGOTADO'], message: '{VALUE} no es un estado válido'
    }, default: 'DISPONIBLE'
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

module.exports = mongoose.model('Producto', productoSchema);