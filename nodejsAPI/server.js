'use strict'

const app = require('./app')
const config = require('./config')
const database = require('./database');
const backup = require('./Backup/Backup');

app.listen(config.port);
console.log(`[ESPERE]: Servidor corriendo en el puerto: ${config.port}`);