const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['01)studentGroupAddition', '02)studentGroupRemove', '03)groupCreation', '04)studentTaskAssignment', '05)groupTaskAssignment',
      '06)studentTestAssignment', '07)groupTestAssignment', '08)studentTaskSending', '09)studentTestComplete', '10)teacherTestCheck',
      '11)studentQuestionComplaint', '12)teacherQuestionCreation', '13)adminQuestionCreation', '14)teacherTaskCreation',
      '15)adminTaskCreation', '16)teacherTaskBlock', '17)adminTaskBlock', '18)teacherRightsToStudentDelegation',
      '19)adminRightsToStudentDelegation', '20)adminRightsToTeacherDelegation'],
  },
  userType: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  toUserType: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
  },
  toUserId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User',
  },
  groupId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Group',
  },
  taskId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Task',
  },
  questionId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Question',
  },
  testTopicsIds: [{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Topic',
  }],
  date: Date,
});

module.exports = mongoose.model('Activities', ActivitiesSchema);
