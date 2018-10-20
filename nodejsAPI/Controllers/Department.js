'use strict'

//Modules
const mongoose = require('mongoose');
//Models
const Department = require('../Models/Department');

/**
 * Crear un nuevo departamento
 * @param {String} edificeId id del edificio
 * @param {String} departmentNumber numero de departamentos
 * @param {String} numberOfResidents numeros de residentes
 * @param {String} departmentFloor piso del departamento
 */
function postDepartment(req, res) {
  const department = Department({
    _id: new mongoose.Types.ObjectId(),
    edifice: req.body.edificeId,
    numberDepartment: req.body.departmentNumber,
    quantityUser: req.body.numberOfResidents,
    floorDepartment: req.body.departmentFloor,
  });
  department.save()
    .then(resultado => {
      console.log("A new department has been created")
      res.status(200).json({
        success: true,
        result: resultado
      });
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error
      });
    });
}

/**
 * Obtener todos los departamentos 
 */
function getDepartment(req, res) {
  Department.find()
    .exec()
    .then(docs => {
      console.log("A request for all the departments has been done");
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports = {
  postDepartment,
  getDepartment
}