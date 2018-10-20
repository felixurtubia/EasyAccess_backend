'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const edificeSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: false },
    location: { type: String, required: false },
    numberDepartments: { type: String, required: false },
});

module.exports = mongoose.model('Edifice', edificeSchema);