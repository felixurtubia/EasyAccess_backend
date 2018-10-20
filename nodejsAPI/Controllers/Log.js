'use strict'

//Modules
const mongoose = require('mongoose');
//Models
const Log = require('../Models/Log');
const User = require('../Models/User');
const Third = require('../Models/Third');


function createLog(name, description, user, third){
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        name : name,
        description: description,
        date: Date.now(),
        user: user,
        third: third

    });
    log.save()
        .then(answer => {
            console.log("Log created:" + log.name)

        })
        .catch(err => {
            console.log(error);
        })
}



/**
 * Log del usuario junto a la fecha y hora de su reconocimiento
 * @param {String} idFounded id del usuario que se reconocio facialmente
 */
function logRecognitionUser(idFounded) {
    //var dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 0,
        user: idFounded,
        comment: "Someone has entered"
    });
    log.save()
        .then(answer => {
            console.log("Log Recognition User creation accomplished");
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Log del usuario al crear un invitado junto a su fecha y hora
 * @param {String} idUser id del usuario
 * @param {String} idThird id del invitado
 */
function logThird(idUser, idThird) {
    //var dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 1,
        user: idUser,
        third: idThird,
        comment: "A new guest has been created",
    })
    log.save()
        .then(answer => {
            console.log("log create invited creation accomplished");
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Log del usuario al invitar un tercero junto su fecha y hora
 * @param {String} idUser id del usuario
 * @param {String} other informacion sobre el tercero
 */
function logOther(idUser, other) {
    //var dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 2,
        user: idUser,
        comment : other,
    })
    log.save()
        .then(answer => {
            console.log("log other creation accomplished");
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Log del invitado junto a la fecha y hora de su reconocimiento
 * @param {String} idFounded id del invitado que se reconocio facialmente
 */
function logRecognitionThird(idFounded) {
    //var dateTime = getDateTime();
    Third.find({ _id: idFounded })
        .exec()
        .then(docs => {
            const log = Log({
                _id: new mongoose.Types.ObjectId(),
                type: 3,
                user: docs.user,
                third: idFounded,
                comment: "A new guest has been identified"
            });
            log.save()
                .then(answer => {
                    console.log("Log Recognition Third creation accomplished");
                })
                .catch(error => {
                    console.log(error);
                });
        })
        .catch(err => {
            console.log(err);
        });
}

/**
 * Log del usuario al invitar un tercero junto su fecha y hora
 * @param {String} idThird id del invitado
 * @param {Boolean} newAccess nuevo valor del acceso del invitado
 */
function logUpdateAccess(idThird, newAccess){
    //var dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 4,
        third: idThird,
        comment: "Acces changed to: " + newAccess.toString(),
    })
    log.save()
        .then(answer => {
            console.log("log other creation accomplished");
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Log cuando se falla la identificacion junto su fecha y hora
 */
function logFailRecognition(){
    //var dateTime = getDateTime();
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 5,
    })
    log.save()
        .then(answer => {
            console.log("log other creation accomplished");
        })
        .catch(error => {
            console.log(error);
        });
}

/**
 * Entrega todos los logs
 */
function getLog(req, res) {
    Log.find()
        .exec()
        .then(docs => {
            User.populate(docs, { path: "user" }, function (err, docs) {
                Third.populate(docs, { path: "third" }, function (err, docs) {
                    console.log("Route: /Log [GET] Get all logs");
                    res.status(200).send(docs);
                });
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
    logRecognitionUser,
    logRecognitionThird,
    logThird,
    logUpdateAccess,
    logOther,
    logFailRecognition,
    getLog,
    getDateTime,
    createLog,
}
