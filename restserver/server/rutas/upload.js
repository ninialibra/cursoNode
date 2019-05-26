const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();

const Usuario = require('../modelos/usuario');

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

    // Use the mv() method to place the file somewhere on your server
    archivo.mv(`uploads/${tipo}/${archivo.name}`, (error) => {

        if (error) {
            return res.status(500).json({
                ok: false,
                error
            });
        }

        res.json({
            ok: true,
            mensaje: 'Imagen subida correctamente'
        });
    });

});

module.exports = app;