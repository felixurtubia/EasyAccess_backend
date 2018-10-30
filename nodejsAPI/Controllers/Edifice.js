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

/*
  Generar un nuevo codigo para registro
*/
function generateCode(req, res){
  Edifice.findById("5bca670ccbc43f3ae43cb4ba").exec()
  .then(edifice => {
    console.log("Generating code for building:" + edifice.name);
    //Se genera numero entre 100.000 y 999.999
    var numero = Math.floor(Math.random()*(999999-100000+1)+100000);
    console.log("Generated code: " + numero);
    edifice.code = numero;
    edifice.save();
    res.status(200).json({code:numero});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err,
    });
  })
}

/*
 Obtener el codigo generado para registro
*/
function retrieveCode(req, res){
  Edifice.findById("5bca670ccbc43f3ae43cb4ba").exec()
  .then(edifice=> {
    res.status(200).json({code:edifice.code});
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err});
  });
}

module.exports = {
  postEdifice,
  getEdifice,
  retrieveCode,
  generateCode,
}