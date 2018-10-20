'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const guardSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    edifice: { required: false, type: schema.ObjectId, ref: "Edifice" },
    name: { type: String, required: false },
    lastname: { type: String, required: false },
    rut: { type: String, required: false, trim: true, match: /\d{8}-\d{1}/ },
    phone: { type: String, require: false },
});

module.exports = mongoose.model('Guard', guardSchema);