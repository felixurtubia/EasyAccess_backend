'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const logSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    //relacion log-user
    user : { type: schema.ObjectId, ref: "User" }, 
    date : String,
    time : String
});

module.exports = mongoose.model('Log', logSchema);