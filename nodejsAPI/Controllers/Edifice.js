'use strict'

//Modules
const mongoose = require('mongoose');
//Models
const Edifice = require('../Models/Edifice');

/**
 * Crear un nuevo departamento
 * @param {String} name nombre del edificio
 * @param {String} location ubicacion
 * @param {String} numberDepartments numeros de departamentos
 */
function postEdifice(req, res) {
  const edifice = Edifice({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    location: req.body.location,
    numberDepartments: req.body.numberDepartments
  });
  edifice.save()
    .then(resultado => {
      console.log("A new building has been created")
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
 * Obtener todos los edificios
 */
function getEdifice(req, res) {
  Edifice.find()
    .exec()
    .then(docs => {
      console.log("A request for all the buildings has been done");
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
  postEdifice,
  getEdifice
}