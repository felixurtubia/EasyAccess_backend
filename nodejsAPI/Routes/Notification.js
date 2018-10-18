'use strict'

const express = require('express');
const notificationCtrl = require("../Controllers/Notification");
const router = express.Router();

//RUTAS
router.get('/:idUser', notificationCtrl.getNotification);
router.post('/fromResident', notificationCtrl.postNotificacionResident);
router.post('/fromAdmin', notificationCtrl.postNotificacionAdmin);
router.put('/:idUser',notificationCtrl.registerNewConnection);

module.exports = router;
