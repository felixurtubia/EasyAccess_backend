'use strict'

//const user = require('../Models/User');
//let db = require('../database');

function getUser (req, res){
    
    res.send('Get correcto');
}

function postUser(req, res){
    res.send('Hello World');
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