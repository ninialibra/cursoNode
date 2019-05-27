const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../modelos/usuario');
const Producto = require('../modelos/producto');

//nativos de node
const fs = require('fs');
const path = require('path');

// default options
app.use(fileUpload({ useTempFiles: true, tempFileDir: 'uploads/' }));

app.put('/upload/:tipo/:id', function (req, res) {

    let tipo = req.params.tipo;
    let id = req.params.id;

    if (Object.keys(req.files).length == 0) {

        return res.status(400).json({
            ok: false,
            error: {
                mensaje: 'No se ha seleccionado ningún archivo'
            }
        });
    }

    //validar tipo
    let tipos_validos = ['productos', 'usuarios'];
    if (tipos_validos.indexOf(tipo) < 0) {
        return res.status(400).json({
            ok: false,
            error: {
                mensaje: 'Los tipos permitidos son ' + tipos_validos.join(', '),
                tipo
            }
        });
    }

    // The name of the input field (i.e. "archivo") is used to retrieve the uploaded file
    let archivo = req.files.archivo;

    //obtenemos extension del archivo
    let nombre_cortado = archivo.name.split('.');
    let extension = (nombre_cortado[nombre_cortado.length - 1]).toLowerCase();

    //control de extension
    let extensionesValidas = ['png', 'jpg', 'gif', 'jpeg'];

    if (extensionesValidas.indexOf(extension) < 0) {
        return res.status(400).json({
            ok: false,
            error: {
                mensaje: 'Las extensiones permitidas son ' + extensionesValidas.join(', '),
                extension
            }
        });
    }

    //cambiar nombre de archivo
    let nombre_archivo = `${id}-${new Date().getMilliseconds()}.${extension}`;

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${nombre_archivo}`, (error) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        //aqui la imagen ya esta cargada
        if (tipo === 'usuarios') {
            imgUsuario(id, res, nombre_archivo);
        } else {
            imgProducto(id, res, nombre_archivo);
        }

    });
});

function imgUsuario(id, res, nombre_archivo) {

    Usuario.findById(id, (error, usuarioBD) => {

        //si hay errores borra la imagen subida por limpieza
        if (error) {

            borraArchivo(nombre_archivo, 'usuarios');

            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!usuarioBD) {

            borraArchivo(nombre_archivo, 'usuarios');

            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'El usuario no existe'
                }
            });
        }

        //borrado de la imagen anterior
        borraArchivo(usuarioBD.img, 'usuarios');

        usuarioBD.img = nombre_archivo;

        usuarioBD.save((error, usuarioBD) => {
            res.json({
                ok: true,
                usuario: usuarioBD,
                img: nombre_archivo
            });
        });

    });

}

function imgProducto(id, res, nombre_archivo) {

    Producto.findById(id, (error, productoBD) => {

        //si hay errores borra la imagen subida por limpieza
        if (error) {

            borraArchivo(nombre_archivo, 'productos');

            return res.status(500).json({
                ok: false,
                error
            });
        }

        if (!productoBD) {

            borraArchivo(nombre_archivo, 'productos');

            return res.status(400).json({
                ok: false,
                error: {
                    mensaje: 'El producto no existe'
                }
            });
        }

        //borrado de la imagen anterior
        borraArchivo(productoBD.img, 'productos');

        productoBD.img = nombre_archivo;

        productoBD.save((error, productoBD) => {
            res.json({
                ok: true,
                producto: productoBD,
                img: nombre_archivo
            });
        });

    });

}

function borraArchivo(nombre_imagen, tipo) {

    let pathImagen = path.resolve(__dirname, `../uploads/${tipo}/${nombre_imagen}`);

    if (fs.existsSync(pathImagen)) {
        fs.unlinkSync(pathImagen);
    }
}

module.exports = app;