const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

let Schema = mongoose.Schema;

let categoriaSchema = new Schema({

  nombre: {
    type: String,
    required: [true, 'El nombre es necesario'],
  },  
  idUsuario: {
    type: String
  },

});

module.exports = mongoose.model('Categoria', categoriaSchema);