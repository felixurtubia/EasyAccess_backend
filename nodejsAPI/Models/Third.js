'use strict'

const mongoose = require('mongoose');

const thirdSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    //relacion log-user
    user : { type: schema.ObjectId, ref: "User" },
    name : String,
    lastName : String, 
    rut : String,
    access : Boolean
});

module.exports = mongoose.model('Third', thirdSchema);