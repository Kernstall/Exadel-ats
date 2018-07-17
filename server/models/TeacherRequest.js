const mongoose = require('mongoose');

const TeacherRequestSchema = new mongoose.Schema({
  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: Date,
});

module.exports = mongoose.model('TeacherRequest', TeacherRequestSchema);
