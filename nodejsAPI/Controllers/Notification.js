'use strict'

const Notification = require('../Models/Notificaction');
const logCtrl = require('./Log');

/**
 * Retorna todos las notificaciones de un usuario
 */
function getNotification(req, res){
    const idUser = req.params.idUser;
    console.log("Gettin third")
    Notification.find({user: idUser})
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

  function postNotificacionResident(req, res){ // NOTIFICACION QUE ENVIA EL RESIDENTE
      console.log("Creating new notification! ");
      var dateTime =  logCtrl.getDateTime();
      const notification = Notification({
        _id: new mongoose.Types.ObjectId(),
        user : req.params.iduser,
        description : req.params.description,
        commentary : req.params.commentary,
        date : dateTime[0],
        time : dateTime[1]
      });
      notification.save()
        .then(resultado => {
          var params = {
              method: 'POST',
              uri: 'http://51.15.240.129:3000/api/5b33bd5cc5c7741bd9e6fc21/push',
              headers: {
                  "message": {
                    "title":"Aviso", // PUEDE SER DESCRIPTION
                    "body": "Viene un servicio externo a mi departamento", // PUEDE SER COMENTARY
                    "params": {}
                  }
              }
          };
          rp(params).then(function (response){
            res.status(201).json({
                success: true,
                mensaje: "notification save",
                usuario: resultado
              });
              console.log(response);
            }).catch(function (err) {
              console.log(err);
            });
          console.log("notification save");
        }).catch(error => {
          console.log(error);
          res.status(500).json({
            success: false,
            error: error
          });
        });
  }

function postNotificacionAdmin(req, res){ // NOTIFICACION QUE ENVIA EL GUARDIA
    console.log("Creating new notification! ");
    var dateTime =  logCtrl.getDateTime();
    const notification = Notification({
      _id: new mongoose.Types.ObjectId(),
      user : req.params.iduser,
      description : req.params.description,
      commentary : req.params.commentary,
      date : dateTime[0],
      time : dateTime[1]
    });
    notification.save()
      .then(resultado => {
        var params = {
            method: 'POST',
            uri: 'http://51.15.240.129:3000/api/5b33bd5cc5c7741bd9e6fc21/push',
            headers: {
                "message": {
                  "title":"Aviso", // PUEDE SER DESCRIPTION
                  "body": "Ha llegado tu servicio externo", // PUEDE SER COMENTARY
                  "params": {}
                }
            }
        };
        rp(params).then(function (response){
          res.status(201).json({
              success: true,
              mensaje: "notification save",
              usuario: resultado
            });
            console.log(response);
          }).catch(function (err) {
            console.log(err);
          });
        console.log("notification save");
      }).catch(error => {
        console.log(error);
        res.status(500).json({
          success: false,
          error: error
        });
      });
}


module.exports = {
    getNotification,
    postNotificacion
}
