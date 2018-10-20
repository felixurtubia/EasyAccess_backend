var rp = require('request-promise');

/**
 * Creacion de un usuario en la api de django ingresando
 * las imagenes para entrenar y preparar el analisis de match
 */
var createUser = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',

        uri: 'http://easy.faceapi.boldware.cl/api/Persons/',

        form: {
            idMongo:  req.idUser,
            image1: req.image1,
            image2: req.image2,
            image3: req.image3
        },
        headers: {
            /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        }
    };
    rp(options)
      .then(function (body) {
        resolve(body);
      })
      .catch(function (err) {
        reject(err);
      });
 })
}


var createUserGuest = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',

        uri: 'http://easy.faceapi.boldware.cl/api/guest/',

        form: {
            idCreador: req.idCreator,
            idMongo:  req.idUser,
            image1: req.image1,
            image2: req.image2,
            image3: req.image3
        },
        headers: {
            /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        }
    };
    rp(options)
      .then(function (body) {
        resolve(body);
      })
      .catch(function (err) {
        reject(err);
      });
 })
}
/**
* Recibe una imagen correspondiente a la persona con intenciones de ingresar,
* en este punto por medio de un POST se hace analisis de las imagenes ingresadas
* anteriormente con la que se envia, se recibe un id en el caso que haya un match
* y un valor nulo en caso que no haya match.
* Se genera una notificación de "Vuestro invitado ha arrivado" y se envia a la aplicacion
* del residente.
*/
var makeMatch = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',

        uri: 'http://easy.faceapi.boldware.cl/api/getId',

        form: {
            image: req.image
        },
        headers: {
            /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        }
    };
    /*
    var params = {

        method: 'POST',
        uri: 'http://51.15.240.129:3000/api/5b33/push',
      	'body': {
       		"token":'L7S9O5M4T1I',
      	      "message": {
                "title":"Exito",
                "body": "Vuestro invitado ha arrivado",
                "params": {}
              }
          },
	json:true


    };
    */
    rp(options)
      .then(function (body) {
        console.log("this is body",body);

        if(body[0] > 0 ){
        	reject("No está registrado");}
        else{
          //var id = body[1];
          resolve(body);
        }

      })
      .catch(function (err) {
        reject(err);
      });
 })
}

module.exports = {
    createUser,
    makeMatch,
    createUserGuest
}
