const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  status: String,
  educationalEstablishment: mongoose.Schema.Types.ObjectId,
  graduateYear: Number,
});

module.exports = mongoose.model('employee', employeeSchema);
