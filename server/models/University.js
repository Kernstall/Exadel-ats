const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
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

module.exports = mongoose.model('University', UniversitySchema);
