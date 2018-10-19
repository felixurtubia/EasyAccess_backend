'use strict'

const express = require('express');
const otherCtrl = require("../Controllers/Other");
const router = express.Router();

//RUTAS
router.post('/', otherCtrl.postOther);

module.exports = router;