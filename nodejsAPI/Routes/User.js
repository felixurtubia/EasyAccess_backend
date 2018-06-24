'use strict'

const express = require('express');
const userCtrl = require("../Controllers/User");
const router = express.Router();

//RUTAS
router.get('/', userCtrl.getUser);
router.get('/:userRut', userCtrl.getUserRut);
router.post('/', userCtrl.postUser);
router.delete('/:userRut', userCtrl.deleteUser);
router.put('/:userRut', userCtrl.deleteUser);

module.exports = router;