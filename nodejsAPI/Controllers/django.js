var rp = require('request-promise');


var createUser = function (req, res){
  return new Promise(function(resolve, reject){
    var options = {
        method: 'POST',
        uri: 'http://posttestserver.com/post.php',
        form: {
            idMongo:  req.idUser,
            image1: req.picture1,
            image2: req.picture2,
            image3: req.picture3,
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
        //reject(err);
        console.log('paso por aca!!')
        resolve(body);
      });
 })
}

module.exports = {
    createUser
}
