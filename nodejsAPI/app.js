'use strict'

const express = require('express');
const bodyParse = require("body-parser");
const app = express();
const api = require("./Routes/index");

app.use(bodyParse.urlencoded( {extended : false}));
app.use(bodyParse.json());
app.use('/User', api)

module.exports = app;