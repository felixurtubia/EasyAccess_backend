'use strict'
const cors = require('cors');
var express = require('express');
var bodyParse = require("body-parser");
var contentType = require('content-type')
var app = express();
var userRoute = require("./Routes/User");
var logRoute = require("./Routes/Log");
var thirdRoute = require('./Routes/Third');
var notificationRoute = require('./Routes/Notification');
var getRawBody = require('raw-body');

app.use(cors());
app.options('*', cors());

app.use(bodyParse.json({limit: '50mb'}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));


//CONFIGURACIONES PRIMARIAS
app.use('/Upload', express.static('Upload')); /*permite dar las imagenes por localhost:3000/Upload/[:imagen]*/

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});

//IMPORTAR RUTAS
app.use('/User', userRoute);
app.use('/Log', logRoute);
app.use('/Third', thirdRoute);
app.use('/Notification', notificationRoute);

//CONFIGURACIONES SECUNDARIAS
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;