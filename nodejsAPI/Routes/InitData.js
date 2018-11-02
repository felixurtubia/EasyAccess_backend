'use strict'

const express = require('express');
const initDataCtrl = require("../Controllers/InitData");
const router = express.Router();

//RUTAS
router.get('/', initDataCtrl.getInitData);
router.put('/', initDataCtrl.updateInitData);

module.exports = router;