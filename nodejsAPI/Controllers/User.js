'use strict'

//Modules
const mongoose = require('mongoose');
const base64Img = require('base64-img');
//Controllers
const django = require('./django.js');
const logCtrl = require('./Log');
const thirdCtrl = require('./Third');
const edificeCtrl = require('./Edifice')
//Models
const User = require('../Models/User');
const Edifice = require('../Models/Edifice');
const Third = require('../Models/Third');
const Department = require('../Models/Department');

/**
 * Entrega todos los usuarios 
 */
function getUser(req, res) {
  User.find()
    .exec()
    .then(docs => {

      Department.populate(docs, { path: "department" }, function (err, docs) {
            res.status(200).send(docs);
            console.log("Route: /User [GET] Get all Users");
    });
      
      //res.status(200).json(docs);
      //console.log("Route: /User [GET] Get all Users");
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

/**
 * Entrega el usuario mediante su rut
 * @param {String} userRut rut del usuario (RUTA)
 */
function getUserRut(req, res) {
  const userRut = req.params.userRut;
  User.findOne({ rut: userRut })
    .exec()
    .then(docs => {
      res.status(200).json(docs);
      console.log("Route: /User/:userRut [GET] Get the User by rut");
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        error: error
      })
    });
}

/**
 * Crear usuario
 * @param {String} name nombre del usuario
 * @param {String} lastname apellido del usuario
 * @param {String} rut rut del usuario
 * @param image1 imagen1 del usuario
 * @param image2 imagen2 del usuario
 * @param image3 imagen3 del usuario
 */
function postUser(req, res) {
  var numero = Math.floor(Math.random()*(999999-100000+1)+100000);
  const user = User({
    _id: new mongoose.Types.ObjectId(),
    department: "5bca7cbc7944c28e153a1019",
    name: req.body.name,
    lastname: req.body.lastname,
    rut: req.body.rut,
    birthDate: "16/07/2018",
    pin: numero,
  });
  user.save()
    .then(resultado => {
      console.log("Route: /User/ [POST] create User now posting to faceapi");
      var toDjango = {
        idUser: resultado._id.toString(),
        image1: req.body.image1,
        image2: req.body.image2,
        image3: req.body.image3
      }
      django.createUser(toDjango)
        .then(resp => {
          console.log("Faceapi trained accomplished");
          logCtrl.createLog("Se ha creado un usuario",
            "Usuario " + resultado.name + " " + resultado.lastname + " ha sido creado",
            "",
            "",
            14);
          res.status(201).json({
            success: true,
            mensaje: "Usuario creado",
            usuario: resultado,
            pin: resultado.pin,
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
function getUserIdPromise(req,res){
  return new Promise(function (resolve, reject) {
        var idUser = req.idUser;
        console.log(idUser);
        User.find({ _id: idUser })
          .exec()
          .then(docs => {
            console.log(docs[0])
            console.log("Route: /User/:idUser [GET] Get user by id on promise");
            resolve(docs[0])
          })
          .catch(err => {
            console.log(err);
            reject(err)
          });
    
      })
    
    }
/**
 * Se envia una foto para reconocimiento facial
 * @param image imagen de la persona
 */
function postIdentification(req, res) {
  var toDjango2 = {
    image: req.body.image
  }
  console.log("Identification begin");
  django.makeMatch(toDjango2)
    .then(resp2 => {
      if (resp2[0] == 0) {
        console.log("es residente")
        IdentificationUser(resp2[1]);
        getUserIdPromise({idUser:resp2[1]}).then(data=>{
          if(data.access){
            res.status(202).json({
              success: true,
              idMongo: resp2[1],
              type: 'user',
              msg: 'Usuario residente'
            });
          }
          else{
            res.status(200).json({
              success: false,
              idMongo: resp2[1],
              type: 'user',
              msg: 'Usuario residente bloqueado por administrador'
            });
          }

        })
        
     
      } else if (resp2[0] == 1) {
        let reqParams = { idUser: resp2[1] }
        thirdCtrl.getThirdPromise(reqParams).then(data => {
          console.log(data.access);
          console.log(data.name);
          if (data.access) {
            IdentificationThird(resp2[1], resp2[2]);
            console.log("Es invitado permitido");
            res.status(202).json({
              success: true,
              idMongo: resp2[1],
              idCreator: resp2[2],
              type: 'third',
              msg: "El residente permite su entrada"
            });
          } else {
            IdentificationThird(resp2[1], resp2[2]);
            console.log("Es invitado no permitido");
            res.status(200).json({
              success: false,
              idMongo: resp2[1],
              idCreator: resp2[2],
              type: 'third',
              msg: "El residente denegó su entrada"
            });
          }
        }).catch(error => {
          res.status(500).json({ success: false, msg: error })
        })
      } else {
        res.status(202).json({
          success: true,
          idMongo: resp2[1],
          msg: "usuario identificado"
        });
      };


    }).catch(error => {
      console.log("Identification failed, reason: ");
      logCtrl.createLog('Fallo de identificación',
        'Fallo de identificación',
        '',
        '',
        5);
      res.status(500).json({
        success: false,
        error: error,
        msg: 'Usuario no identificado'
      });
    });
}

/**
 * si es un usuario, se agrega el log
 * @param {String} idUser id de un usuario
 */
function IdentificationUser(idUser) {
  console.log("identification succeed !! is a User");

  var name = "Residente Identificado";
  var description = "Residente Identificado";
  var user = idUser;
  var third = '';
  var type = 0;

  logCtrl.createLog(name, description, user, third, type);
}

/**
 * si es un invitado, se agrega el log y se manda una notificacion
 * @param {String} idThird id de un invitado
 */
function IdentificationThird(idThird, idUser) {
  console.log("identification succeed !! is a Third");
  //logCtrl.logRecognitionThird(idThird);
  Third.findByIdAndUpdate(idThird, { lastAccess: Date.now() })
    .exec()
    .then(result => {
      console.log(result);
    })
    .catch(err => {
      console.log(err);
    });

  var name = "Invitado identificado";
  var description = "Invitado identificado";
  var user = idUser;
  var third = idThird;
  var type = 3
  logCtrl.createLog(name, description, user, third, type);
}

/**
 * Actualizar algun dato de un usuario mediante su id
 * @param {String} userId id del usuario
 */
function updateUser(req, res) {
  const userId = req.params.userId;
  User.findByIdAndUpdate(userId, { $set: req.body }, { new: true })
    .exec()
    .then(result => {
      logCtrl.createLog("Se ha actualizado los datos del residente",
        result.name + " " + result.lastname + " con éxito",
        "",
        "",
        7);
      res.status(200).json({
        success: true,
        user: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        success: false,
        error: err
      });
    });
};

/**
 * Eliminar un usuario por su id
 * @param {String} userId id del usuario (RUTA)
 */
function deleteUser(req, res) {
  const userId = req.params.userId;
  User.findByIdAndRemove(userId)
    .exec()
    .then(result => {

      django.deleteUser(userId)
        .then(resp => {
          console.log("Eliminado de Django");
          logCtrl.createLog("Se ha eliminado un residente",
            result.name + " " + result.lastname + "con éxito",
            "",
            "",
            8);

          res.status(200).json({
            sucess: true,
            user: result
          });

        }).catch(error => {
          console.log(error);
          res.status(500).json({
            success: false,
            error: error
          });
        })

    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        sucess: false,
        error: err
      });
    });
}

function loginUser(req, res) {
  const password = req.body.password;
  const rut = req.body.rut;
  /* Edifice.findById("5bca670ccbc43f3ae43cb4ba", function (err, edifice) {
    if (err) {
      console.log(err);
      res.status(500).json({ success: false })
    }
    var code = edifice.code;
    console.log("password received: " + password + " comparing against: " + code);
    if (password == code) {
      res.status(200).json({ success: true });
      logCtrl.createLog("Residente ingresa por primera vez a la App",
        "El usuario " + "rut" + " ha ingresado haciendo uso del código " + "codigo",
        "",
        "",
        6);
    } else {
      res.status(403).json({ success: false });
    }
  });*/

  User.findOne({ rut: rut, pin:password })
  .exec()
  .then(docs => {
    console.log("Route: /User/login, user finded");
    res.status(200).json({success:true, id: docs._id, data:docs })
    /*if(userPass=="passwordTest"){
      res.status(200).json(docs);
      console.log("User identified");
    } else {
      res.status(403).json({success: false});
      console.log("Password equivocada" + userPass);
    };*/
    
  })
  .catch(error => {
    console.log(error);
    res.status(403).json({success: false});
    console.log("Password equivocada o algun problema :D" + password);
  });

}

function lateThird(req, res) {
  var idUser = req.params.idUser;
  Third.find({ user: idUser })
    .exec()
    .then(docs => {
      var i;
      var laterSixMonth = [];
      for (i = 0; i < Object.keys(docs).length; i++) {
        if (sixMonthMore(docs[i].lastAccess)) {
          laterSixMonth.push({ name: docs[i].name, _id: docs[i]._id });
        }
      }
      if (laterSixMonth.length != 0) {
        console.log(laterSixMonth);
        res.status(200).json({
          later: true,
          list: laterSixMonth
        });
      } else {
        res.status(200).json({
          later: false
        });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

function sixMonthMore(thirdDate) {
  var today = new Date();
  var sixMonth = 180 * 24 * 60 * 60 * 1000;
  if (Math.abs(today - thirdDate) > sixMonth) {
    return true;
  }
  return false;
}

module.exports = {
  getUser,
  getUserRut,
  postUser,
  updateUser,
  deleteUser,
  postIdentification,
  loginUser,
  lateThird
}