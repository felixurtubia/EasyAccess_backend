'use strict'

const express = require('express');
const edificeController = require("../Controllers/Edifice");
const router = express.Router();

//RUTAS
router.post('/', edificeController.postEdifice);
router.get('/', edificeController.getEdifice);
//router.put('/:idEdifice', thirdCtrl.updateAccess)

module.exports = router;