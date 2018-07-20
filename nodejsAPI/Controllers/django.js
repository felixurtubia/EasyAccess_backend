var rp = require('request-promise');


var createUser = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',
        uri: 'http://easy.faceapi.boldware.cl/api/Persons',
        form: {
            idMongo:  req.idUser,
            image1: req.picture1,
            image2: req.picture2,
            image3: req.picture3
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
        uri: 'http://easy.faceapi.boldware.cl/api/getId',
        form: {
            image: req.picture
        },
        headers: {
            /* 'content-type': 'application/x-www-form-urlencoded' */ // Is set automatically
        }
    };
    rp(options)
      .then(function (body) {
        resolve({id:body.data});
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
