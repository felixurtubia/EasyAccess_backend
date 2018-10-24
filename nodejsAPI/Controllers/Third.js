'use strict'

//Modules
const mongoose = require('mongoose');
const base64Img = require('base64-img');
//Controllers
const logCtrl = require('./Log');
const django = require('./django.js');
//Models
const Third = require('../Models/Third');

/**
 * Entrega todos los invitados de un usuario mediante
 * la id de ese usuario
 * @param {String} idUser id del usuario (RUTA)
 */
function getThird(req, res) {
  var idUser = req.params.idUser;
  Third.find({ user: idUser })
    .exec()
    .then(docs => {
      console.log("Route: /Third/:idUser [GET] Get all invited the user");
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}


function getThirdPromise(req) {
  return new Promise(function (resolve, reject) {
    var idUser = req.params.idUser;
    Third.find({ user: idUser })
      .exec()
      .then(docs => {
        console.log("Route: /Third/:idUser [GET] Get all invited the user");
        resolve(docs)
      })
      .catch(err => {
        console.log(err);
        reject(err)
      });

  })

}
/**
 * Se busca un invitado mediante su id en la ruta
 * y se actualiza su 'access' con el valor
 * @param {String} idThird id del invitado (RUTA)
 * @param {Boolean} access se le permite el acceso al invitado? (JSON)
 */
function updateAccess(req, res) {
  var idThird = req.params.idThird;
  var newAccess = req.body.access
  Third.update({ _id: idThird },
    {
      $set: {
        "access": newAccess,
      }
    }
  ).exec()
    .then(result => {
      console.log("Route: /Third/:idThird [PUT] Update 'access' the invited");
      logCtrl.logUpdateAccess(idThird, newAccess);
      // logCtrl.createLog("Change status", "El estado de invitado ha sido cambiado a " + newAccess,
      // "...", idThird); // Cambiar el ... al usuario
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
 * Crear un invitado y asociarlo a un usuario
 * @param {String} iduser id del usuario que crea el invitado (JSON)
 * @param {String} name nombre del invitado (JSON)
 * @param {String} lastname apellido del invitado (JSON)
 * @param {String} rut rut del invitado (JSON)
 * @param {Boolean} access se le permite el acceso al invitado (JSON)
 * @param image1 imagen 1 del invitado (JSON)
 * @param image2 imagen 2 del invitado (JSON)
 * @param image3 imagen 3 del invitado (JSON)
 */

//Si falla django se debe borrar el usario por que si
function postThird(req, res) {
  const third = Third({
    _id: new mongoose.Types.ObjectId(),
    user: req.body.idUser,
    name: req.body.name,
    lastname: req.body.lastname,
    rut: req.body.rut,
    access: true
  });
  third.save()
    .then(resultado => {
      console.log("Route: /Third/ [POST] Create invited, now posting to faceapi");
      var toDjango = {
        idUser: resultado._id.toString(),
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3,
        idCreator: req.body.idUser,
        isGuest: true,
      }
      django.createUserGuest(toDjango)
        .then(resp => {
          console.log("Faceapi trained accomplished");
          logCtrl.logThird(req.body.idUser, resultado._id);
          // logCtrl.createLog("Third created", "El invitado " + resultado._id.toString() + " ha sido ingresado",
          //req.body.idUser.toString(), resultado._id.toString());
          res.status(201).json({
            success: true,
            message: "Third create",
            invited: resultado
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

module.exports = {
  postThird,
  updateAccess,
  getThird,
  getThirdPromise
}
