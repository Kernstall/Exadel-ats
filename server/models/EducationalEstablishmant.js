const mongoose = require('mongoose');

const educationalEstablishmentSchema = new mongoose.Schema({
  fullName: String,
  shortName: String,
  faculties: [{
    fullName: String,
    shortName: String,
  }],
});

module.exports = mongoose.model('educationalEstablishment', educationalEstablishmentSchema);
