'use strict'

const Notification = require('../Models/Notificaction');

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

module.exports = {
    getNotification
}