const express = require('express');
const Usuario = require('../modelos/usuario');

const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const app = express();

//encriptacion de contraseñas
const bcrypt = require('bcrypt');

//funciones adicionales de JS
const _ = require('underscore');

app.get('/usuario', verificaToken, (req, res) => {

  let desde = req.query.desde || 0;
  desde = Number(desde);

  let limite = req.query.limite || 5;
  limite = Number(limite);

  Usuario.find({ estado: true }, 'nombre email role estado google email')
    .skip(desde)
    .limit(limite)
    .exec((error, usuarios)=> {

      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }

      Usuario.countDocuments({ estado: true }, (error, nRegistros) => {
        res.json({
          ok: true,
          count: nRegistros,
          usuarios,
        });
      });

    });
});

app.post('/usuario', [verificaToken, verificaAdminRole], function (req, res) {

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

app.put('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {

  let id = req.params.id;

  //filtra los parametros para coger solo los indicados
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

app.delete('/usuario/:id', [verificaToken, verificaAdminRole], function (req, res) {

  let id = req.params.id;

  //Usuario.findByIdAndRemove(id, (error, usuarioBorrado) => {
  Usuario.findByIdAndUpdate(id, { estado: false }, { new: true }, (error, usuarioBorrado) => {

    if (error) {
      return res.status(400).json({
        ok: false,
        error,
      });
    };

    if (!usuarioBorrado) {
      return res.status(400).json({
        ok: false,
        error: {
          mensaje: 'Usuario no encontrado',
        },
      });
    }

    res.json({
      ok: true,
      usuario: usuarioBorrado,
    });
  });
});

module.exports = app;
