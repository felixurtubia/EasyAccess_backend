'use strict'

const config = require('./config')
const mongoose = require('mongoose');

mongoose.connect(config.dbCloud).then(
  () => {
    console.log("[ESPERE]: base de datos conectada");
    console.log("[LISTO]: API LISTA:");
  },
  err => {
    console.log(err);
  }
)