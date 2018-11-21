'use strict'

var backup = require('mongodb-backup');
var cron = require('node-cron');

function BackupDB() {
    backup({
        uri: "mongodb://Admin:Admin@cluster0-shard-00-00-eoomm.mongodb.net:27017,cluster0-shard-00-01-eoomm.mongodb.net:27017,cluster0-shard-00-02-eoomm.mongodb.net:27017/EasyAccess?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true",
        root: __dirname,
        tar: 'EasyAccess.tar',
        callback: function (err) {
            if (err) {
                console.error(err);
            } else {
                console.log('Respaldo base de datos con exito');
            }
        }
    });
}
 
cron.schedule('* * * * *', () => { //23:59:59 los domingos
  BackupDB();
  console.log("Haciendo Backup en cada minuto")
});