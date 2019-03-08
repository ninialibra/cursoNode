const express = require('express');

const app = express();

app.get('/usuario', function (req, res) {
  res.json('getUsuario');
});

app.post('/usuario', function (req, res) {

  let body = req.body;

  if (body.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre del usuario es obligatorio'
    });
  } else {
    res.json({ persona: body });
  }
});

app.put('/usuario/:id', function (req, res) {

  let id = req.params.id;

  res.json({ id });
});

app.delete('/usuario', function (req, res) {
  res.json('deleteUsuario');
})

module.exports = app;
