const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({

  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },  
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario'
  },

});

module.exports = mongoose.model('Categoria', categoriaSchema);