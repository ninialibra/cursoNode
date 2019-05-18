const express = require('express');
const { verificaToken, verificaAdminRole } = require('../middlewares/autenticacion');

const app = express();

//funciones adicionales de JS
const _ = require('underscore');

const Categoria = require('../modelos/categoria');

 //todas las categorias
 app.get('/categoria', verificaToken, (req, res) => {
      
    Categoria.find({}, 'nombre idUsuario')      
      .exec((error, categorias)=> {
  
        if (error) {
          return res.status(400).json({
            ok: false,
            error,
          });
        }
  
        Categoria.countDocuments({ }, (error, nRegistros) => {
          res.json({
            ok: true,
            count: nRegistros,
            categorias,
          });
        });
  
      });
  });

//mostrar una categoria por id con get
app.get('/categoria/:id', verificaToken, (req, res) => {
      
    let id = req.params.id;

    Categoria.findById(id, (error, categoriaBD)=>{

        if (error) {
            return res.status(400).json({
              ok: false,
              error,
            });
        }

        if (!categoriaBD) {
            return res.status(400).json({
              ok: false,
              error: {
                mensaje: 'Categoría no encontrada',
              },
            });
          }
      
          res.json({
            ok: true,
            categoria: categoriaBD,
          });
    });
});

//crear nueva categoria con post que devuelve la categoria creada
app.post('/categoria', [verificaToken], function (req, res) {

    let body = req.body; 
    let idUsuario = req.usuario._id;
  
    let categoria = new Categoria({
      nombre: body.nombre,
      idUsuario
    });
  
    categoria.save((error, categoriaBD) => {
      if (error) {
        return res.status(500).json({
          ok: false,
          error,
        });
      }

      if (!categoriaBD) {
        return res.status(400).json({
          ok: false,
          error,
        });
      }
          
      res.json({
        ok: true,
        categoria: categoriaBD,
      });
  
    });
  
  });

//put para actualizar categoria
app.put('/categoria/:id', [verificaToken], function (req, res) {

    let id = req.params.id;
  
    //filtra los parametros para coger solo los indicados
    let body = _.pick(req.body, ['nombre']);
  
    Categoria.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, categoriaBD) => {
  
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      };
  
      res.json({
        ok: true,
        categoria: categoriaBD,
      });
    });
  });

//delete de la categoria: solo puede borrar un admin
app.delete('/categoria/:id', [verificaToken, verificaAdminRole], function (req, res) {

    let id = req.params.id;
  
    Categoria.findByIdAndRemove(id, (error, categoriaBorrada) => {    
  
      if (error) {
        return res.status(400).json({
          ok: false,
          error,
        });
      };
  
      if (!categoriaBorrada) {
        return res.status(400).json({
          ok: false,
          error: {
            mensaje: 'Categoría no encontrada',
          },
        });
      }
  
      res.json({
        ok: true,
        mensaje: "Categoría eliminada correctamente",
      });
    });
  });

module.exports = app;