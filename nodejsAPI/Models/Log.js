'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const logSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    type : Number,
    //relacion log-user
    user : { type: schema.ObjectId, ref: "User" },
    third : {type: schema.ObjectId, ref: "Third"}, 
    comment : String,
    date : String,
    time : String
});

module.exports = mongoose.model('Log', logSchema);