require('./config/config');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./rutas/usuario'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useCreateIndex: true }, (error, res) => {
  if (error) throw error;

  console.log('Conexión realizada a la base de datos');
});

app.listen(process.env.PORT, () => {
  console.log('Escuchando el puerto:', process.env.PORT);
});
