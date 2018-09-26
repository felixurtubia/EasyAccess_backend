'use strict'

const Log = require('../Models/Log');

/**
 * Entrega la fecha y hora
 * @returns {String[]} [fecha, hora]
 */
function getDateTime() {
    var date = new Date();
    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;
    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;
    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    month = (month < 10 ? "0" : "") + month;
    var day  = date.getDate();
    day = (day < 10 ? "0" : "") + day;
    return [year + "/" + month + "/" + day, hour + ":" + min + ":" + sec];
}

/**
 * Guarda el usuario junto a la fecha y hora de su reconocimiento
 * @param {Object} idUser
 */
function logRecognition(idFounded){
    dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        user: idFounded,
        date: dateTime[0],
        time: dateTime[1]
    })
    log.save()
    .then(answer => {
        console.log("log creation accomplished");
    })
    .catch(error => {
        console.log("log creation error");
    });    
}
/**
 * Retorna todos los logs 
 */
function getLog(req, res){
  console.log("Get log")
  Log.find()
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
    logRecognition,
    getLog
  }