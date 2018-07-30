const mongoose = require('mongoose');

module.exports = {
  status: {
    type: String,
    enum: ['teacher', 'admin', 'student'],
  },
  firstName: String,
  lastName: String,
  email: String,
  passwordHash: String,
  passwordSalt: String,
  university: String,
  faculty: String,
  graduateYear: Number,
  course: String,
  groupNumber: Number,
  mediumTaskScore: Number,
  tasks: [{
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
    groupId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Group',
    },
    startDate: Date,
    finishDate: Date,
    isPassed: Boolean,
    bestResult: Number,
    attempts:
      [{
        date: Date,
        number: Number,
        mainFile: String,
        files: [String],
        result: Number,
        isPassed: Boolean,
        tests: [Boolean],
        comments: [{
          teacherId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
          },
          date: Date,
          text: String,
        }],
      }],
  }],
  mediumTestScore: Number,
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
};
