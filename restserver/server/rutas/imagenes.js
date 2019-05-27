const express = require('express');
const { verificaTokenImg } = require('../middlewares/autenticacion');

//nativos de node
const fs = require('fs');
const path = require('path');

const app = express();

//todas las categorias
app.get('/imagen/:tipo/:img', verificaTokenImg, (req, res) => {

    let tipo = req.params.tipo;
    let imagen = req.params.img;

    let pathImg = path.resolve(__dirname, `../uploads/${tipo}/${imagen}`);
    
    if (fs.existsSync(pathImg)) {        
        res.sendFile(pathImg);
    } else {
        let pathNoImagen = path.resolve(__dirname, '../assets/no-image.jpg');
        res.sendFile(pathNoImagen);
    }

});

module.exports = app;