'use strict'

const express = require('express');
const userCtrl = require("../Controllers/User");
var router = express.Router();

//RUTAS

router.get('/', userCtrl.getUser);
router.post('/', userCtrl.postUser);
router.delete('/:userId', userCtrl.deleteUser);
router.put('/:userId', userCtrl.deleteUser);

module.exports = router;