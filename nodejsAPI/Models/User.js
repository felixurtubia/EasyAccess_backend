'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    _id : mongoose.Schema.Types.ObjectId,
    nombre : String,
    Apellido : String,
    rut : String,
    //fotos : [{type: String}] //arreglo de fotos
});

module.exports = mongoose.model('User', userSchema);