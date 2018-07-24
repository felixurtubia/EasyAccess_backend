var rp = require('request-promise');


var createUser = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',
        //uri: 'http://easy.faceapi.boldware.cl/api/Persons',
        uri: 'http://easy.faceapi.lifeware.cl/api/Persons/',
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


var makeMatch = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',
        //uri: 'http://easy.faceapi.boldware.cl/api/getId',
        uri: 'http://easy.faceapi.lifeware.cl/api/getId',
        form: {
            image: req.image
        },
        headers: {
            /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        }
    };
    rp(options)
      .then(function (body) {
        console.log("this is body",body);

        if(body == 'unknown'){ 

        	reject("No está registrado");}
        else{
        	  resolve({id:body});
        }
      
      })
      .catch(function (err) {
        reject(err);
      });
 })
}

module.exports = {
    createUser,
    makeMatch
}
