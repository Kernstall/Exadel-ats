const mongoose = require('mongoose');
const studentFields = require('./User/studentFields');
const teacherFields = require('./User/teacherFields');
const adminFields = require('./User/adminFields');

const fields = Object.assign({}, studentFields, teacherFields, adminFields);

const studentSchema = new mongoose.Schema(fields);

module.exports = mongoose.model('User', studentSchema);
