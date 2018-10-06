'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const guardSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    edifice: { required: true, type: schema.ObjectId, ref: "Edifice" },
    name: { type: String, required: true },
    lastname: { type: String, required: true },
    rut: { type: String, required: true, trim: true, match: /\d{8}-\d{1}/ },
    phone: { type: String, require: true },
});

module.exports = mongoose.model('Guard', guardSchema);