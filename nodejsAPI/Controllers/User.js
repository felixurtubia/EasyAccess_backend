'use strict'

//Modules
const mongoose = require('mongoose');
const base64Img = require('base64-img');
//Controllers
const django = require('./django.js');
const logCtrl = require('./Log');
//Models
const User = require('../Models/User');

/**
 * Entrega todos los usuarios 
 */
function getUser(req, res) {
  User.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
      console.log("Route: /User [GET] Get all Users");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

/**
 * Entrega el usuario mediante su rut
 * @param {String} userRut rut del usuario (RUTA)
 */
function getUserRut(req, res) {
  const userRut = req.params.userRut;
  User.findOne({ rut: userRut })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
      console.log("Route: /User/:userRut [GET] Get the User by rut");
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
}

/**
 * Crear usuario
 * @param {String} name nombre del usuario
 * @param {String} lastname apellido del usuario
 * @param {String} rut rut del usuario
 * @param image1 imagen1 del usuario
 * @param image2 imagen2 del usuario
 * @param image3 imagen3 del usuario
 */
function postUser(req, res) {
  const user = User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    lastname: req.body.lastname,
    rut: req.body.rut
  });
  user.save()
    .then(resultado => {
      console.log("Route: /User/ [POST] create User now posting to faceapi");

      var toDjango = {
        idUser: resultado._id.toString(),
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3
      }
      django.createUser(toDjango)
        .then(resp => {
          //          console.log(resp);
          console.log("Faceapi trained accomplished");
          res.status(201).json({
            success: true,
            mensaje: "Usuario creado",
            usuario: resultado
          });
        }).catch(error => {
          console.log(error);
          res.status(500).json({
            success: false,
            error: error
          });
        })
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error
      });
    });
}

/**
 * Se envia una foto para reconocimiento facial
 * @param image imagen de la persona
 */
function postIdentification(req, res) {
  var toDjango2 = {
    image: req.body.image
  }
  console.log(toDjango2.image);
  console.log("identification begin");

  django.makeMatch(toDjango2)
    .then(resp2 => {
      res.status(201).json({
        success: true,
        idFounded: resp2
      });
      if(true){
        IdentificationUser(resp2);
      } else{
        IdentificationThird(resp2);
      }      
    }).catch(error => {
      console.log("Identification failded, reason: " + error);
      res.status(500).json({
        success: false,
        error: error
      });
    })
}

function IdentificationUser(idUser){
  console.log("identification succeed !! is a User");
  logCtrl.logRecognitionUser(idUser);
}

function IdentificationThird(idThird){
  console.log("identification succeed !! is a Third");
  logCtrl.logRecognitionThird(idThird);
  // Llamar funcion que manda una notificacion
}

/**
 * Actualizar algun dato de un usuario mediante su rut
 * @param {String} userRut rut del usuario
 */
function updateUser(req, res) {
  const userRut = req.params.userRut;
  const actualizar = {};
  for (const campo of req.body) {
    actualizar[campo.propName] = campo.value;
  }
  Product.update({ rut: userRut }, { $set: actualizar })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

/**
 * Eliminar un usuario por su rut
 * @param {String} userRut rut del usuario (RUTA)
 */
function deleteUser(req, res) {
  const userRut = req.params.userRut;
  User.findOneAndRemove({ rut: userRut })
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

module.exports = {
  getUser,
  getUserRut,
  postUser,
  updateUser,
  deleteUser,
  postIdentification
}
