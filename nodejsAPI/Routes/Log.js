'use strict'

const express = require('express');
const logCtrl = require("../Controllers/Log");
const router = express.Router();

//RUTAS
router.get('/', logCtrl.getLog);
router.post('/',logCtrl.logOther);
module.exports = router;