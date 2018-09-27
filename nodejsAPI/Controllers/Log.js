'use strict'

const Log = require('../Models/Log');
const User = require('../Models/User');

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
        type : 0,
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
 * Guarda el usuario y al invitado junto a la fecha y hora de su creacion
 * @param {Object} idUser
 * @param {Object} idThird
 */
function logThird(idUser, idThird){
    dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type : 1,
        user: idFounded,
        third: idThird,
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
 * Guarda el usuario que invito a otra personas con su fecha y hora de su creacion
 * @param {Object} idUser
 */
function logOther(idUser){
    dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type : 2,
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
    .then(docs => { //logs
        User.populate(docs, {path: "user"},function(err, docs){
        	res.status(200).send(docs);
        });
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
    logThird,
    logOther,
    getLog
  }