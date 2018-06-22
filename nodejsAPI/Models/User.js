'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema

const userSchema = schema({
    nombre : String,
    apellido : String,
    fotos : [{type: String}] //arreglo de fotos
})