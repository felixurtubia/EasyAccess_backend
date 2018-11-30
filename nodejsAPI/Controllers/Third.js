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

function getAllThird(req, res) {
  var idUser = req.params.idUser;
  Third.find()
    .exec()
    .then(docs => {
      console.log("Route: /Third/:idUser [GET] Get all invited");

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
    var idUser = req.idUser;
    console.log(idUser);
    Third.find({ _id: idUser })
      .exec()
      .then(docs => {
        console.log(docs[0])
        console.log("Route: /Third/:idUser [GET] Get all invited users");
        resolve(docs[0])
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
  Third.findByIdAndUpdate(idThird,
    {
      $set: {
        "access": newAccess,
      }
    }, { new: true }
  ).exec()
    .then(result => {
      console.log("Route: /Third/:idThird [PUT] Update 'access' the invited");
      logCtrl.createLog("Se ha cambiado el acceso de un invitado",
        DescriptionUpdateAcess(result),
        "",
        "",
        4);
      res.status(200).json({
        sucess: true,
        third: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        error: err
      });
    });
}

/**
 * Genera una descripcion para el log de cambio de acceso de un invitado
 * @param {JSON} third informacion de un invitado
 */
function DescriptionUpdateAcess(third) {
  var access = "";
  if (third.access) {
    access = "Se le permite el acceso a ";
  } else {
    access = "Se le niega el acceso a ";
  }
  return access + third.name + " " + third.lastname;
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
          logCtrl.createLog("Se ha creado un invitado",
            "Invitado " + resultado.name + " " + resultado.lastname + " se ha creado",
            "",
            "",
            1);
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

/**
 * Actualizar algun dato de un usuario mediante su id
 * @param {String} userId id del usuario
 */
function updateThird(req, res) {
  const thirdId = req.params.thirdId;
  Third.findByIdAndUpdate(thirdId, { $set: req.body }, { new: true })
    .exec()
    .then(result => {
      logCtrl.createLog("Se ha actualizado los datos del invitado",
        "Invitado " + result.name + " " + result.lastname + " ha actualizado sus datos",
        "",
        "",
        9);
      res.status(200).json({
        sucess: true,
        invited: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        error: err
      });
    });
};

/**
 * Eliminar un invitado por su id
 * @param {String} thirdId id del invitado (RUTA)
 */
function deleteThird(req, res) {
  const thirdId = req.params.thirdId;

  Third.findByIdAndRemove(thirdId)
    .exec()
    .then(result => {
     
      django.deleteUser(result._id).then(result=>{console.log("borrado de django")}).catch(err=>{console.log(err)})

      logCtrl.createLog("Se ha eliminado un invitado",
        "Invitado " + result.name + " " + result.lastname + " ha sido eliminado",
        "",
        "",
        10);
      res.status(200).json({
        sucess: true,
        invited: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err
      });
    });
}

module.exports = {
  postThird,
  updateAccess,
  deleteThird,
  getThird,
  getThirdPromise,
  getAllThird,
  updateThird
}
