const express = require('express');
const { verificaToken } = require('../middlewares/autenticacion');

const app = express();

//funciones adicionales de JS
const _ = require('underscore');

const Producto = require('../modelos/producto');

//todos los productos
app.get('/productos', verificaToken, (req, res) => {

    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    Producto.find({ disponible: true })
        .skip(desde)
        .limit(limite)
        .sort('nombre')
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((error, productos) => {
            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }

            Producto.countDocuments({}, (error, nRegistros) => {
                res.json({
                    ok: true,
                    count: nRegistros,
                    productos
                });
            });
        });
});

//mostrar un producto
app.get('/producto/:id', verificaToken, (req, res) => {
    let id = req.params.id;

    Producto.findById(id)
        .populate('usuario', 'nombre email')
        .populate('categoria', 'nombre')
        .exec((error, productoBD) => {

            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }

            if (!productoBD) {
                return res.status(400).json({
                    ok: false,
                    error: {
                        mensaje: "Producto no encontrado"
                    }
                });
            }

            res.json({
                ok: true,
                producto: productoBD
            });
        });
});

//buscar productos
app.get('/productos/buscar/:termino', verificaToken, (req, res) => {

    let termino = req.params.termino;
    let regex = new RegExp(termino,'i');

    Producto.find({ nombre: regex, disponible: true })                
        .populate('categoria', 'nombre')
        .exec((error, productos) => {

            if (error) {
                return res.status(400).json({
                    ok: false,
                    error
                });
            }
            
            res.json({
                ok: true,
                productos
            });
        });
});

//crear nuevo producto
app.post('/producto', verificaToken, function (req, res) {

    let body = req.body;
    let usuario = req.usuario._id;

    let producto = new Producto({
        nombre: body.nombre,
        precioUni: body.precioUni,
        descripcion: body.descripcion,
        disponible: body.disponible,
        categoria: body.categoria,
        usuario: usuario,
    });

    producto.save((error, productoBD) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            producto: productoBD
        });
    });
});

//put para actualizar producto
app.put('/producto/:id', verificaToken, function (req, res) {

    let id = req.params.id;

    //filtra los parametros para coger solo los indicados
    let body = _.pick(req.body, ['nombre', 'descripcion', 'precioUni']);

    Producto.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (error, productoBD) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if (!productoBD) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            producto: productoBD
        });
    }
    );
});

//borrar producto
app.delete('/producto/:id', verificaToken, function (req, res) {

    let id = req.params.id;

    Producto.findByIdAndUpdate(id, { disponible: false }, { new: true }, (error, productoBorrado) => {
        if (error) {
            return res.status(400).json({
                ok: false,
                error
            });
        }

        if (!productoBorrado) {
            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: "Producto no encontrado"
                }
            });
        }

        res.json({
            ok: true,
            mensaje: "Producto eliminado correctamente"
        });
    });
});

module.exports = app;
