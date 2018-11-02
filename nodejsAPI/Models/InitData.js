'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const initDataSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    version: {type: String, required: false}
});

module.exports = mongoose.model('InitData', initDataSchema);