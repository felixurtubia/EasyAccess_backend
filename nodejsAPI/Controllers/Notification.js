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

function postNotificacion(req, res){
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
        console.log("notification save");
        res.status(201).json({
            success: true,
            mensaje: "notification save",
            usuario: resultado
          });
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