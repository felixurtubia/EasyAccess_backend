'use strict'

const mongoose = require('mongoose');
const schema = mongoose.Schema;

const departmentSchema = schema({
    _id: mongoose.Schema.Types.ObjectId,
    edifice: { required: true, type: schema.ObjectId, ref: "Edifice" },
    numberDepartment: { type: String, required: true },
    quiantityUser: { type: String, required: true },
    floorDepartment: { type: String, required: true },
});

module.exports = mongoose.model('Department', departmentSchema);