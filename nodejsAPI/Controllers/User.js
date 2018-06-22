'use strict'

let mongoDb = require('../database');

function getUser (req, res){
    mongoDb.Listar();
    res.send("get correcto");
}

function postUser(req, res){
    mongoDb.Insertar(req.body)
    res.send('Post correcto');
}

function updateUser(req, res){
    res.send('Hello World');
}

function deleteUser(req, res){
    res.send('Hello World');
}

module.exports = {
    getUser,
    postUser,
    updateUser,
    deleteUser
}