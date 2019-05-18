require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');
const path = require('path'); //propio de node

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//habilitar carpeta public
app.use(express.static(path.resolve(__dirname,'../public')));

//configuracion global de rutas
app.use(require('./rutas/index'));

mongoose.connect(process.env.URLBD, { useNewUrlParser: true, useCreateIndex: true }, (error, res) => {
  if (error) throw error;

  console.log('Conexión realizada a la base de datos');
});

app.listen(process.env.PORT, () => {
  console.log('Escuchando el puerto:', process.env.PORT);
});
