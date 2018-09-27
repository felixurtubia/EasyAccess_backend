'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const notificationSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    user : { type: schema.ObjectId, ref: "User" },
    description : String,
    commentary : String,
    date : String,
    time : String
});

module.exports = mongoose.model('Notification', notificationSchema);