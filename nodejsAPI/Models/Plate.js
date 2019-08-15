'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const palteSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : { type: schema.ObjectId, ref: "User" },
    plateCode : String,
    ownerName : String,
    creationDate: String,
    expirationDate : String,
    carModel: String,
    description: String,
    access: Boolean
});

module.exports = mongoose.model('Plate', palteSchema);