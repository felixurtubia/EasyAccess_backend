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
    department: "5bca7cbc7944c28e153a1019",
    name: req.body.name,
    lastname: req.body.lastname,
    rut: req.body.rut,
    birthDate: "16/07/2018"
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
          logCtrl.createLog("A user has been created", 
                            "User " + resultado._id.toString() + " has been created",
                            resultado._id.toString(),
                            "...")
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
  console.log("Identification begin");
  django.makeMatch(toDjango2)
    .then(resp2 => {
      if(resp2[0]==0){
        IdentificationUser(resp2[1]);
      } else if (resp2[0]==1){
        IdentificationThird(resp2[1], resp2[2]);
      };  
      res.status(201).json({
        success: true,
        idFounded: resp2[1]
      });
          
    }).catch(error => {
      console.log("Identification failed, reason: " + error);
      logCtrl.createLog("Identification Failed", 
                        "Someone just tried to identificate and failed",
                        "...",
                        "...");
      res.status(500).json({
        success: false,
        error: error
      });
      //logCtrl.logFailRecognition();
    });
}

/**
 * si es un usuario, se agrega el log
 * @param {String} idUser id de un usuario
 */
function IdentificationUser(idUser){
  console.log("identification succeed !! is a User");
  //logCtrl.logRecognitionUser(idUser);

  name = "A user has entered the building";
  description = "The user " + idUser + " has entered the building";
  user = idUser;
  third = "...";

  logCtrl.createLog(name, description, user, third);
}

/**
 * si es un invitado, se agrega el log y se manda una notificacion
 * @param {String} idThird id de un invitado
 */
function IdentificationThird(idThird, idUser){
  console.log("identification succeed !! is a Third");
  //logCtrl.logRecognitionThird(idThird);
  name = "A guest has entered the building";
  description = "Guest " + idThird +" from " + idUser + " has entered the building";
  user = idUser;
  third = idThird;

  logCtrl.createLog(name, description, user, third);
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
