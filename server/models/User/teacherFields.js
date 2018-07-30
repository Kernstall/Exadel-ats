const mongoose = require('mongoose');

module.exports = {
  status: {
    type: String,
    enum: ['teacher', 'admin', 'student'],
  },
  firstName: String,
  lastName: String,
  fathersName: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  university: String,
  graduateYear: Number,
  testsToCheck: [
    {
      studentId: mongoose.Schema.Types.ObjectId,
      testToCheckId: mongoose.Schema.Types.ObjectId,
    },
  ],
};
