'use strict'

const express = require('express');
const userCtrl = require("../Controllers/User");
const router = express.Router();

//RUTAS
router.get('/', userCtrl.getUser);
router.get('/:userRut', userCtrl.getUserRut);
router.post('/', userCtrl.postUser);
router.post('/getId', userCtrl.postIdentification);
router.delete('/:userRut', userCtrl.deleteUser);
router.put('/:userRut', userCtrl.updateUser);

module.exports = router;
