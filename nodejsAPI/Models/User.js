'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const userSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    rut: { type: String, required: true, trim: true, match: /\d{8}-\d{1}/ },
    birthDate: { type: String, require: true }
});

module.exports = mongoose.model('User', userSchema);