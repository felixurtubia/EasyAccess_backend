'use strict'
const cors = require('cors');
var express = require('express');
var bodyParse = require("body-parser");
var app = express();
var userRoute = require("./Routes/User");
var logRoute = require("./Routes/Log");
var thirdRoute = require('./Routes/Third');
var notificationRoute = require('./Routes/Notification');
var otherRoute = require('./Routes/Other');
var edificeRoute = require('./Routes/Edifice');
var departmentRoute = require('./Routes/Department');
var guardRoute = require('./Routes/Guard');
var InitDataRoute = require('./Routes/InitData');
var plateRoute = require('./Routes/Plate');

var getRawBody = require('raw-body');
var contentType = require('content-type');

app.use(cors());
app.options('*', cors());
  
app.use(bodyParse.json({limit: '50mb'}));
app.use(bodyParse.urlencoded({limit: '50mb', extended: true}));


app.use( '/loaderio-6617d1894c74529d42d12bddb2732a06/', express.static('./loaderio-6617d1894c74529d42d12bddb2732a06.txt'));
app.use( '/loaderio-6617d1894c74529d42d12bddb2732a06.html', express.static('./loaderio-6617d1894c74529d42d12bddb2732a06.txt'));
app.use( '/loaderio-6617d1894c74529d42d12bddb2732a06.txt', express.static('./loaderio-6617d1894c74529d42d12bddb2732a06.txt'));

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
app.use('/Other', otherRoute);
app.use('/Edifice', edificeRoute);
app.use('/Department', departmentRoute);
app.use('/Guard', guardRoute);
app.use('/InitData', InitDataRoute);
app.use('/Plate', plateRoute)
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