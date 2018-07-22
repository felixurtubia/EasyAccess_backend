'use strict'

const express = require('express');
const bodyParse = require("body-parser");
var contentType = require('content-type')
const app = express();
const userRoute = require("./Routes/User");
var getRawBody = require('raw-body');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(function (req, res, next) {
  getRawBody(req, {
    length: req.headers['content-length'],
    limit: '100mb',
    encoding: contentType.parse(req).parameters.charset
  }, function (err, string) {
    if (err) return next(err)
    req.text = string
    next()
  })
});

const recognitionRoute = require("./Routes/Recognition");


//CONFIGURACIONES PRIMARIAS
app.use('/Upload', express.static('Upload')); /*permite dar las imagenes por localhost:3000/Upload/[:imagen]*/
app.use(bodyParse.urlencoded( {extended : false}));
app.use(bodyParse.json());
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
//app.use('/Recognition', recognitionRoute);

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
