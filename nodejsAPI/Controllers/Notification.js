'use strict'

const Notification = require('../Models/Notification');
const logCtrl = require('./Log');
const uuidv4 = require('uuid/v4');
var rp = require('request-promise');
/**
 * Retorna todos las notificaciones de un usuario
 */
function getNotification(req, res) {
  const idUser = req.params.idUser;
  console.log("Gettin third")
  Notification.find({ user: idUser })
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

// Crear conexion con servidor de mensajes.
// PENDIENTE: VALIDAR DATA DE USUARIO

function registerNewConnection(req, res) {
  const idUser = req.params.idUser
  const connectionId = uuidv4();
  var params = {
    method: 'PUT',
    uri: 'http://easy.notification.boldware.cl/api/' + idUser + '/register',
    headers: {
      "X-AUTH-TOKEN": 'L7S9O5M4T1I',
      'Content-Type': 'application/x-www-form-urlencoded',
      'connectionId': connectionId
    }
  }
  // Request de registro de nuevo cliente a NOTIFICATION SERVER

  // Se debe guardar en BD los datos de conexión para rescatarlos al momento de enviar notificación

  rp(params).then(function (response) {
    res.status(200).json({
      url: 'http://easy.notification.boldware.cl/',
      userId: idUser,
      connectionId: connectionId
    })
  }).catch(function (err) {
    res.status(500).json({error:err, message:"Can't generate connection token"})
    console.log(err);
  });


}
function postNotificacionResident(req, res) { // NOTIFICACION QUE ENVIA EL RESIDENTE
  console.log("Creating new notification! ");
  var dateTime = logCtrl.getDateTime();
  const notification = Notification({
    _id: new mongoose.Types.ObjectId(),
    user: req.params.iduser,
    description: req.params.description,
    commentary: req.params.commentary,
    date: dateTime[0],
    time: dateTime[1]
  });
  notification.save()
    .then(resultado => {
      var params = {
        method: 'POST',
        uri: 'http://51.15.240.129:3000/api/5b33bd5cc5c7741bd9e6fc21/push',
        headers: {
          "message": {
            "title": "Aviso", // PUEDE SER DESCRIPTION
            "body": "Viene un servicio externo a mi departamento", // PUEDE SER COMENTARY
            "params": {}
          }
        }
      };
      rp(params).then(function (response) {
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

function postNotificacionAdmin(req, res) { // NOTIFICACION QUE ENVIA EL GUARDIA
  console.log("Creating new notification! ");
  var dateTime = logCtrl.getDateTime();
  const notification = Notification({
    _id: new mongoose.Types.ObjectId(),
    user: req.params.iduser,
    description: req.params.description,
    commentary: req.params.commentary,
    date: dateTime[0],
    time: dateTime[1]
  });
  notification.save()
    .then(resultado => {
      var params = {
        method: 'POST',
        uri: 'http://51.15.240.129:3000/api/5b33bd5cc5c7741bd9e6fc21/push',
        headers: {
          "message": {
            "title": "Aviso", // PUEDE SER DESCRIPTION
            "body": "Ha llegado tu servicio externo", // PUEDE SER COMENTARY
            "params": {}
          }
        }
      };
      rp(params).then(function (response) {
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
  postNotificacionResident,
  postNotificacionAdmin,
  registerNewConnection
}
