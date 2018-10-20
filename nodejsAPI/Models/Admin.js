'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const adminSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    edifice: { required: false, type: schema.ObjectId, ref: "Edifice" },
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    rut: { type: String, required: false, trim: true, match: /\d{8}-\d{1}/ },
    birthDate: { type: String, require: false },
    phone :  { type: String, require: false },
    startDate: { type: String, require: false },
});

module.exports = mongoose.model('Admin', adminSchema);