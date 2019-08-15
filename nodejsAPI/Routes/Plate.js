'use strict'

const express = require('express');
const plateController = require("../Controllers/Plate");
const router = express.Router();

//RUTAS
router.post('/', plateController.postPlate);
router.get('/:idUser', plateController.getPlate);
router.put('/:idPlate',plateController.updateAccess);

module.exports = router;