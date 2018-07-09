const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  status: String,
  university: String,
  graduateYear: Number,
});

module.exports = mongoose.model('employeeModel', employeeSchema);
