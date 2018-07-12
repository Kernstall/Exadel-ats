const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  educationalEstablishmentId: mongoose.Schema.Types.ObjectId,
  faculty: String,
  graduateYear: Number,
  course: String,
  groupNumber: Number,
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
      }],
  }],
  tests: [{
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
