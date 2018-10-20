'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const thirdSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { required: false, type: schema.ObjectId, ref: "User" },
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    access: { type: Boolean, required: false },
    rut: {type:String, required: false}
});

module.exports = mongoose.model('Third', thirdSchema);