'use strict'

const express = require('express');
const guardCtrl = require("../Controllers/Guard");
const router = express.Router();

//RUTAS
router.post('/', guardCtrl.postGuard);
router.get('/', guardCtrl.getGuard);
router.put('/:guardId', guardCtrl.updateGuard);
router.delete('/:guardId', guardCtrl.deleteGuard);

module.exports = router;