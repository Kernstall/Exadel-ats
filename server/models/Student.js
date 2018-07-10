const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  educationalEstablishment: mongoose.Schema.Types.ObjectId,
  faculty: String,
  graduateYear: Number,
  course: String,
  groupNumber: Number,
  tasks: [{
    taskId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    finishDate: Date,
  }],
  tests: [{
    topicsIds: [mongoose.Schema.Types.ObjectId],
    tags: [String],
    attemptId: mongoose.Schema.Types.ObjectId,
    result: mongoose.Schema.Types.ObjectId,
    status: String,
    time: mongoose.Schema.Types.ObjectId,
    questionAmount: mongoose.Schema.Types.ObjectId,
    isTraining: Boolean,
  }],
});

module.exports = mongoose.model('student', studentSchema);
