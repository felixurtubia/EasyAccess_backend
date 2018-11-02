'use strict'

const express = require('express');
const thirdCtrl = require("../Controllers/Third");
const router = express.Router();

//RUTAS
router.post('/', thirdCtrl.postThird);
router.get('/:idUser', thirdCtrl.getThird);
router.put('/:idThird', thirdCtrl.updateAccess);
router.put('/Update/:thirdId', thirdCtrl.updateThird);
router.get('/', thirdCtrl.getAllThird);
router.delete('/:thirdId',thirdCtrl.deleteThird);
module.exports = router;