
var CronJob = require('cron').CronJob;
var Cron = require('./mongodb_backup.js');
new CronJob('0 0 * * * *', function() {
    console.log("Aqui comienza CRON")
    Cron.dbAutoBackUp();
    console.log("Backup DOne ;D")
}, null, true, 'America/New_York');