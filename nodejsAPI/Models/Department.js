'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const departmentSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    edifice: { required: false, type: schema.ObjectId, ref: "Edifice" },
    numberDepartment: { type: String, required: false },
    quantityUser: { type: String, required: false },
    floorDepartment: { type: String, required: false },
});

module.exports = mongoose.model('Department', departmentSchema);