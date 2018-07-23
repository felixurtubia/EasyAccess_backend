'use strict'

const mongoose = require('mongoose');
const User = require('../Models/User');
const django = require('./django.js');
const base64Img = require('base64-img');

function getUser(req, res) {
  console.log("Gettin user")
  User.find()
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

function getUserRut(req, res) {
  const userRut = req.params.userRut;
  User.findOne({ rut: userRut })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
}

function postUser(req, res) { // Function to create a new user
  console.log(req.body.name);
  console.log("Creating new user! ");
  const user = User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    lastname: req.body.lastname,
    rut: req.body.rut
  });
  user.save()
    .then(resultado => {
      console.log("User creation accomplished, now posting to faceapi");

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

function postIdentification(req, res) { // Function to indenticate a person
  var toDjango2 = {
    image1: req.body.image
  }
  django.makeMatch(toDjango2)
    .then(resp2 => {
      res.status(201).json({
        idFounded: id
      });
    }).catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      });
    })
}

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
