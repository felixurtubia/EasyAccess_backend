'use strict'

const mongoose = require('mongoose');
const User = require('../Models/User');

function getUser (req, res){
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

function getUserRut (req, res){
    const userRut = req.params.userRut;
    User.findOne({rut : userRut})
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

function postUser(req, res){
    const user = User({
        _id: new mongoose.Types.ObjectId(),
        nombre: req.body.nombre,
        Apellido: req.body.Apellido,
        rut: req.body.rut
    });
    user.save()
    .then(resultado => {
        res.status(201).json({
            mensaje: "Usuario agregado",
            usuario: resultado});
    }).catch(error => {
        console.log(error);
        res.status(500).json({
          error: error
        });
    });
}

function updateUser(req, res){
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

function deleteUser(req, res){
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
    deleteUser
}