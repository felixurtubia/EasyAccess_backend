'use strict'

const express = require('express');
const recognitionCtrl = require("../Controllers/Recognition");
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: './Upload'});

//RUTAS
router.post('/', upload.single('foto'), recognitionCtrl.RecognitionImage);

module.exports = router;