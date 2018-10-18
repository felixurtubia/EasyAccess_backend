'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const thirdSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    user: { required: true, type: schema.ObjectId, ref: "User" },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    access: { type: Boolean, required: true },
    startDate: { type: String },
    endDate: { type: String }
});

module.exports = mongoose.model('Third', thirdSchema);