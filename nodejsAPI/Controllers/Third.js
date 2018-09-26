'use strict'

const mongoose = require('mongoose');
//const User = require('../Models/User');
const django = require('./django.js');
const base64Img = require('base64-img');
//const Log = require('./Log');
const Third = require('../Models/Third');

/**
 * Se crea un tercero, debe entregar en req el id del usuario
 * que creo el tercero
 */
function postThird(req, res) { 
    console.log(req.body.name);
    console.log("Creating new third! ");
    const third = Third({
      _id: new mongoose.Types.ObjectId(),
      user : mongoose.Types.ObjectId(req.body.user),
      name: req.body.name,
      lastname: req.body.lastname,
      rut: req.body.rut,
      access : Boolean
    });
    third.save()
      .then(resultado => {
        console.log("Third creation accomplished, now posting to faceapi");
        
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
              mensaje: "Third create",
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

  module.exports = {
    postThird
  }