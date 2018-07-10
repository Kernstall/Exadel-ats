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
    topicsIds: [mongoose.Schema.Types.ObjectId],
    tags: [String],
    result: Number,
    status: {
      type: String,
      enum: ['notSent', 'inProgress', 'notPassed', 'passed'],
    },
    time: mongoose.Schema.Types.ObjectId,
    questionAmount: mongoose.Schema.Types.ObjectId,
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
