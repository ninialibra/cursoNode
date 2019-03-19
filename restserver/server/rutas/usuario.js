const express = require('express');
const Usuario = require('../modelos/usuario');
const app = express();
const bcrypt = require('bcrypt');
const _ = require('underscore');

app.get('/usuario', function (req, res) {
  res.json('getUsuario');
});

app.post('/usuario', function (req, res) {

  let body = req.body;

  let usuario = new Usuario({
    nombre: body.nombre,
    email: body.email,
    password: bcrypt.hashSync(body.password, 10),
    role: body.role,
  });

  usuario.save((error, usuarioBD) => {
    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    }

    //usuarioBD.password = null;

    res.json({
      ok: true,
      usuario: usuarioBD,
    });

  });

});

app.put('/usuario/:id', function (req, res) {

  let id = req.params.id;
  let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, usuarioBD) => {

    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    };

    res.json({
      ok: true,
      usuario: usuarioBD,
    });
  });
});

app.delete('/usuario', function (req, res) {
  res.json('deleteUsuario');
});

module.exports = app;
