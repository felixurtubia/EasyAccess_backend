'use strict'

const express = require('express');
const logCtrl = require("../Controllers/Log");
const router = express.Router();

//RUTAS
router.get('/', logCtrl.getLog);
router.get('/Min', logCtrl.getLogMin);
router.post('/',logCtrl.logOther);
router.post('/Filter1/:filter',logCtrl.getLogFilter1);
router.post('/Filter2/:filter',logCtrl.getLogFilter2);
module.exports = router;