const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ['teacher', 'admin', 'student'],
  },
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  passwordHash: String,
  passwordSalt: String,
  university: String,
  faculty: String,
  graduateYear: Number,
  course: String,
  groupNumber: Number,
  testsToCheckIds: [mongoose.Schema.Types.ObjectId],
  tasks: [{
    taskId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    finishDate: Date,
    isPassed: Boolean,
    bestResult: Number,
    attempts:
      [{
        date: Date,
        number: Number,
        files: [String],
        result: Number,
        isPassed: Boolean,
        tests: [Boolean],
        comments: [{
          teacherId: mongoose.Schema.Types.ObjectId,
          date: Date,
          text: String,
        }],
      }],
  }],
  tests: [{
    groupId: mongoose.Schema.Types.ObjectId,
    startDate: Date,
    finishDate: Date,
    topicsIds: [mongoose.Schema.Types.ObjectId],
    tags: [String],
    result: Number,
    status: {
      type: String,
      enum: ['notSent', 'inProgress', 'notPassed', 'passed'],
    },
    time: Number,
    questionAmount: Number,
    isTraining: Boolean,
    attemptTime: Number,
    date: Date,
    questions:
      [{
        questionId: mongoose.Schema.Types.ObjectId,
        selectedAnswers: [String],
        isPassed: Boolean,
      }],
  }],
});

module.exports = mongoose.model('student', studentSchema);
