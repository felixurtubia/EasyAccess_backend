'use strict'

//Modules
const mongoose = require('mongoose');
//Models
const InitData = require('../Models/InitData');

/*Descripcion: Esta clase es para obtener datos iniciales, por ende solo debe haber un
solo registro, no se debe crear ni eliminar, solo actualizar */

/**
 * Retorna los valores iniciales que necesita la app 
 */
function getInitData(req, res) {
  InitData.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
      console.log("Route: /InitData [GET] Get data");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

/**
 * Retorna un bool que indica si hay una nueva version de la app
 *  @param {String} version version actual de la app (RUTA)
 */
function newVersion(req, res) {
  var version = req.params.version;
  InitData.find()
    .exec()
    .then(docs => {
      if (docs[0].version === version) {
        res.status(200).json({
          newVersion: false
        });
      } else {
        res.status(200).json({
          newVersion: true
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

/* NO SE DEBEN CREAR NI ELIMINA MAS INITDATA, SOLO ACTUALIZAR
function postInitData(req, res) {
  const initData = InitData({
    _id: new mongoose.Types.ObjectId(),
    version: req.body.version
  });
  initData.save()
    .then(resultado => {
      console.log("Route: /InitData/ [POST] create data");
      res.status(200).json(resultado);
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        success: false,
        error: error
      });
    });
}
*/

/**
 * Actualizar datos iniciales 
 * @param {String} version nueva version
 */
function updateInitData(req, res) {
  var idInitData = "5bdc98bfdba9d94874a5027b";
  InitData.findByIdAndUpdate(idInitData, { $set: req.body })
    .exec()
    .then(result => {
      console.log(req.body);
      res.status(200).json(req.body);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

module.exports = {
  getInitData,
  newVersion,
  updateInitData
}