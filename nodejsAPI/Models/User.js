'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    department : { required: false, type: schema.ObjectId, ref: "Department" },
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    rut: { type: String, required: false}, //, trim: true, match: /\d{8}-\d{1}/ 
    birthDate: { type: String, require: false },
    created: {type:Date, default: Date.now},
    pin : {type: String, required: false},
    access:{ type:Boolean,default:true },
    pushId : {type: String, required: false},


});

module.exports = mongoose.model('User', userSchema);