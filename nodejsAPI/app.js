'use strict'

const express = require('express');
const bodyParse = require("body-parser");
const app = express();
const userRoute = require("./Routes/User");

const recognitionRoute = require("./Routes/Recognition");

app.use(express.json(limit("1000mb")));

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
