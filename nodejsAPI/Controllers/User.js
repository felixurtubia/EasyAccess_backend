'use strict'

const user = require('../Models/User');
const db = require('../database').db;

function getUser(req, res){
    //console.log("peticion")
    res.send('Hello World');
}

function postUser(req, res){

}

function updateUser(req, res){

}

function deleteUser(req, res){

}

module.exports = {
    getUser,
    postUser,
    updateUser,
    deleteUser
}