'use strict'

//Modules
const mongoose = require('mongoose');
//Models
const Log = require('../Models/Log');
const User = require('../Models/User');
const Third = require('../Models/Third');


function createLog(name, description, user, third, type){
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        name : name,
        description: description,
        date: Date.now(),
        user: user,
        third: third,
        type: type,

    });
    log.save()
        .then(answer => {
            console.log("Log created:" + log.name);

        })
        .catch(error => {
            console.log(error);
        });
}



/**
 * Log del usuario junto a la fecha y hora de su reconocimiento
 * @param {String} idFounded id del usuario que se reconocio facialmente
 */
function logRecognitionUser(idFounded) {

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
function logOther(req,res) {
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 2,
        user: req.body.idUser,
        comment : req.body.comment,
        description: req.body.description
    })
    log.save()
        .then(answer => {
            
            console.log("log other creation accomplished");
            res.status(200).json(answer);
        
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(answer);
       
        });
}

/**
 * Log del invitado junto a la fecha y hora de su reconocimiento
 * @param {String} idFounded id del invitado que se reconocio facialmente
 */
function logRecognitionThird(idFounded) {
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
    const log = Log({
        _id: new mongoose.Types.ObjectId(),
        type: 4,
        third: idThird,
        comment: "Access changed to: " + newAccess.toString(),
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
    Log.find().sort('-date')
        .exec()
        .then(docs => {

            console.log("Route: /Log [GET] Get all logs");
            res.status(200).send(docs);
            /*User.populate(docs, { path: "user" }, function (err, docs) {
                Third.populate(docs, { path: "third" }, function (err, docs) {
                    console.log("Route: /Log [GET] Get all logs");
                    res.status(200).send(docs);
                });
            });*/
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Entrega 40 logs ordenados por la fecha
 */
function getLogMin(req, res) {
    Log.find().sort('-date').limit(40)
        .exec()
        .then(docs => {
            console.log("Route: /Log [GET] Get all logs");
            res.status(200).send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Filtro 1 de los logs
 */
function getLogFilter1(req, res) {
    var filter = req.params.filter;
    var query = {
        $or:
            [
                { name: { $regex: filter, $options: 'i' } },
                { description: { $regex: filter, $options: 'i' } }
            ]
    }
    Log.find(query).sort('-date').limit(20)
        .exec()
        .then(docs => {
            console.log("Route: /Log [GET] Get all logs");
            res.status(200).send(docs);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

/**
 * Filtro 1 de los logs
 */
function getLogFilter2(req, res) {
    var filter = new RegExp('^'+ req.params.filter+'$', 'i');


    //const nameExp = new RegExp('^'+req.body.customerName+'$', 'i');
   //query = { $or : [ { firstName: nameExp }, { lastName: nameExp } ] }; 

    var query = {
        $or:
            [
                { name: filter },
                { description: filter }
            ]
    }
    Log.find(query).sort('-date').limit(20)
        .exec()
        .then(docs => {
            console.log("Route: /Log [GET] Get all logs");
            res.status(200).send(docs);
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
    createLog,
    getLogMin,
    getLogFilter1,
    getLogFilter2
}
