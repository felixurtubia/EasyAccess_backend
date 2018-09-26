'use strict'

const express = require('express');
const thirdCtrl = require("../Controllers/Third");
const router = express.Router();

//RUTAS
router.post('/', thirdCtrl.postThird);

module.exports = router;