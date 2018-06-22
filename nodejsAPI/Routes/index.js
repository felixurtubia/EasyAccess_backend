'use strict'

const express = require('express');
const userCtrl = require("../Controllers/User");
const api = express.Router();

//RUTAS

api.get('/', userCtrl.getUser);
api.post('/User/', userCtrl.postUser);
api.delete('/User/:userId', userCtrl.deleteUser);
api.put('/User/:userId', userCtrl.deleteUser);

module.exports = api;