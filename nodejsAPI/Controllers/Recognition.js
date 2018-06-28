'use strict'

const fs = require('fs');
const path = require('path');

function RecognitionImage(req, res) {
    var ruta = path.join(__dirname, '..', 'Upload');
    var file = ruta + '/' + req.file.filename;
    fs.rename(req.file.path, file, function (err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            res.json({
                mensaje: 'Imagen agregada correctamente',
                file: req.file.filename
            });
        }
    });
}

module.exports = {
    RecognitionImage
}