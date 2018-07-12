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
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
  },
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
          teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Users',
          },
          date: Date,
          text: String,
        }],
      }],
  }],
  tests: [{
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
  },
    startDate: Date,
    finishDate: Date,
    topicsIds: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Topic',
    }],
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
        questionId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Question',
        },
        selectedAnswers: [String],
        isPassed: Boolean,
      }],
  }],
});

module.exports = mongoose.model('Users', studentSchema);
