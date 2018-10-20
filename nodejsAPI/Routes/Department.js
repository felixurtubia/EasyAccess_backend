'use strict'

const express = require('express');
const departmentController = require("../Controllers/Department");
const router = express.Router();

//RUTAS
router.post('/', departmentController.postDepartment);
router.get('/', departmentController.getDepartment);
//router.put('/:idEdifice', thirdCtrl.updateAccess)

module.exports = router;