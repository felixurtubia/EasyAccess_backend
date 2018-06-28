'use strict'

const express = require('express');
const recognitionCtrl = require("../Controllers/Recognition");
const router = express.Router();
const multer = require('multer');
//const upload = multer({ dest: './Upload'});


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
      cb(null, './Upload/');
    },
    filename: function(req, file, cb) {
      cb(null, new Date().toISOString() + "-"+file.originalname);
    }
  });
  
  const fileFilter = (req, file, cb) => {
    // reject a file
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null, true);
    } else {
      cb(null, false);
    }
  };
  
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
  });


//RUTAS
router.post('/', upload.single('foto'), recognitionCtrl.RecognitionImage);

module.exports = router;