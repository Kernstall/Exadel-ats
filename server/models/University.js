const mongoose = require('mongoose');

const educationalEstablishmentSchema = new mongoose.Schema({
  fullName: {
    type: String,
    unique: true,
  },
  shortName: {
    type: String,
    unique: true,
  },
  faculties: [{
    fullName: String,
    shortName: String,
  }],
});

module.exports = mongoose.model('educationalEstablishment', educationalEstablishmentSchema);
