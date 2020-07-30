'use strict'

//Modules
const mongoose = require('mongoose');
//Models
const Plate = require('../Models/Plate');
const User = require('../Models/User');
/**
 * Crear un nuevo departamento
 * @param {String} plateCode codigo patente
 * @param {String} ownerName nombre del dueño
 * @param {String} carModel modelo auto
 * @param {String} description comentario al respecto
 * @param {String} expirationDate fecha termino permiso
 * @param {String} creationDate fecha creacion permiso
 * @param {Boolean} access tiene o no permiso de entrar
 * @param {String} userId
 */
function postPlate(req, res) {
  const plate = Plate({
    _id: new mongoose.Types.ObjectId(),
    plateCode: req.body.plateCode,
    ownerName: req.body.ownerName,
    carModel: req.body.carModel,
    description: req.body.description,
    expirationDate: req.body.expirationDate,
    creationDate: new Date().toISOString().replace('T', ' ').substr(0, 10),
    access: true,
    user: req.body.userId

  });
  plate.save()
    .then(resultado => {
      console.log("A new plate has been created")
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
 * Entrega todos las patentes de un usuario mediante
 * la id de ese usuario
 * @param {String} idUser id del usuario (RUTA)
 */
function getPlate(req, res) {
  if (req.params.idUser !== undefined) {
    Plate.find({ user: req.params.idUser })
      .exec()
      .then(docs => {
        console.log("A request for all user palte's has been done");
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } else {
    Plate.find()
      .exec()
      .then(docs => {
        console.log("A request for all user paalte's has been done");
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
}

/**
 * Entrega todos las patentes de un usuario mediante
 *  * @param {String} plateCode id del usuario (RUTA)
 * la id de ese usuario
 */

function searchPlate(req, res) {
  if (!req.params.plateCode) {

    Plate.find({})
      .exec()
      .then(docs => {
        console.log("A request for all user palte's has been done");
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  } else {
    Plate.find({ plateCode: req.params.plateCode })
      .exec()
      .then(docs => {
        console.log("A request for all user palte's has been done");
        res.status(200).json(docs);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
}


function getPlates(req, res) {

  Plate.find()
    .exec()
    .then(docs => {
      console.log("A request for all user palte's has been done");
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });

}

/**
 * Se busca una patente mediante su id en la ruta
 * y se actualiza su 'access' con el valor
 * @param {String} idPlate id del invitado (RUTA)
 * @param {Boolean} access se le permite el acceso al invitado? (JSON)
 */

function updateAccess(req, res) {
  var idPlate = req.params.idPlate;
  var newAccess = req.body.access
  Plate.findByIdAndUpdate(idPlate,
    {
      $set: {
        "access": newAccess,
      }
    }, { new: true }
  ).exec()
    .then(result => {
      console.log("Route: /plate/:idPlate [PUT] Update 'access' plate");

      /*logCtrl.createLog("Se ha cambiado el acceso de un invitado",
        DescriptionUpdateAcess(result),
        "",
        "",
        4);
      res.status(200).json({
        sucess: true,
        third: result
      });*/
      res.status(200).json({ success: true, plate: result })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        error: err
      });
    });
}

function updatePlate(req, res) {
  var idPlate = req.params.idPlate;
 
  Plate.findByIdAndUpdate(idPlate,
    {
      $set: req.body
    }, { new: true }
  ).exec()
    .then(result => {
      console.log(result)
      console.log("Route: /plate/:idPlate [PUT] Update 'access' plate22");

      /*logCtrl.createLog("Se ha cambiado el acceso de un invitado",
        DescriptionUpdateAcess(result),
        "",
        "",
        4);
      res.status(200).json({
        sucess: true,
        third: result
      });*/
      res.status(200).json({ success: true, plate: result })
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        error: err
      });
    });
}


module.exports = {
  postPlate,
  getPlate,
  updateAccess,
  searchPlate,
  getPlates,
  updatePlate
}