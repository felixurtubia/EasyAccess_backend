'use strict'

const express = require('express');
const notificationCtrl = require("../Controllers/Notification");
const router = express.Router();

//RUTAS
router.get('/:idUser', notificationCtrl.getNotification);

module.exports = router;