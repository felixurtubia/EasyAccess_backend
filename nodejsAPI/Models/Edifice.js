'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const edificeSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    location: { type: String, required: true },
    numberDepartments: { type: String, required: true },
});

module.exports = mongoose.model('Edifice', edificeSchema);