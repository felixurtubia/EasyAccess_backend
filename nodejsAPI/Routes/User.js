'use strict'

const express = require('express');
const userCtrl = require("../Controllers/User");
const router = express.Router();

//RUTAS
router.get('/', userCtrl.getUser); // get all users
router.post('/getId', userCtrl.postIdentification);
router.get('/:userRut', userCtrl.getUserRut); // get user by rut
router.post('/', userCtrl.postUser); // create a new user
router.delete('/:userId', userCtrl.deleteUser);
router.put('/:userId', userCtrl.updateUser);
router.post('/login', userCtrl.loginUser);

module.exports = router;
