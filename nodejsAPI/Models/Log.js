'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const logSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    description : String,
    date : {type: Date, default: Date.now()},
    //relacion log-user
    user : String,//{ type: schema.ObjectId, ref: "User" },
    third : String,//{type: schema.ObjectId, ref: "Third"},
    type: Number, 
    
    
});

module.exports = mongoose.model('Log', logSchema);