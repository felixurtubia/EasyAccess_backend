'use strict'

//Modules
const mongoose = require('mongoose');
//Controllers
const logCtrl = require('./Log');
//Models
const Department = require('../Models/Department');
const Edifice = require('../Models/Edifice');

/**
 * Entrega todos los edificios 
 * @param {String} idUser id del usuario (RUTA)
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