var MongoClient = require('mongodb').MongoClient;
const config = require('./config')
let db;

MongoClient.connect(config.dbCloud, function(err, client) {
  let collection = client.db("EasyAccess").collection("EasyAccess")
  db = collection; 
  db.find().toArray(function(err, results) {
  console.log(results)
  })
   client.close();
});

module.exports = db;