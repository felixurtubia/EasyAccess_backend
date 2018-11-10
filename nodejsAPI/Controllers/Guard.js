'use strict'

//Modules
const mongoose = require('mongoose');
const base64Img = require('base64-img');
//Controllers
const logCtrl = require('./Log');
//Models
const Guard = require('../Models/Guard');

/**
 * Entrega todos los guardias 
 */
function getGuard(req, res) {
    Guard.find()
      .exec()
      .then(docs => {
        res.status(200).json(docs);
        console.log("Route: /Guard [GET] Get all Guard");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  
  /**
   * Crear usuario
   * @param {String} edifice edificio asociado
   * @param {String} lastname apellido del guardia
   * @param {String} rut rut del guardia
   * @param {String} name nombre del guardia
   * @param {String} phone numeros de celular
   */
  function postGuard(req, res) {
    const guard = Guard({
      _id: new mongoose.Types.ObjectId(),
      edifice: "5bca670ccbc43f3ae43cb4ba",
      name: req.body.name,
      lastname: req.body.lastname,
      rut: req.body.rut,
      phone: "11111111"
    });
    guard.save()
      .then(resultado => {
        console.log("Route: /Guard/ [POST] create Guard now");
        logCtrl.createLog("Se ha creado un guardia",
                          "Se ha creado un guardia",
                          "",
                          "",
                          11);
        res.status(200).json(req.body);
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
   * @param {String} guardId id del usuario
   */
  function updateGuard(req, res) {
    const guardId = req.params.guardId;
    Guard.findByIdAndUpdate(guardId , { $set: req.body })
      .exec()
      .then(result => {
        console.log(req.body);
        logCtrl.createLog("Se ha actualizado los datos del guardia",
                          "Se ha actualizado los datos del guardia",
                          "",
                          "",
                          12);
        res.status(200).json(req.body);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  };
  
  /**
   * Eliminar un usuario por su id
   * @param {String} userId id del usuario (RUTA)
   */
  function deleteGuard(req, res) {
    const guardId = req.params.guardId;
    Guard.findByIdAndRemove(guardId)
      .exec()
      .then(result => {
        logCtrl.createLog("Se ha eliminado un guardia",
                      "Se ha eliminado un guardia",
                      "",
                      "",
                      13);
        res.status(200).json("delete success");
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  }
  
  module.exports = {
    postGuard,
    getGuard,
    updateGuard,
    deleteGuard
  }