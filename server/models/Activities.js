const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['1)studentGroupAddition', '2)studentGroupRemove', '3)groupCreation', '4)studentTaskAssignment', '5)groupTaskAssignment',
      '6)studentTestAssignment', '7)studentTestAssignment', '8)studentTestSending', '9)studentTestComplete', '10)teacherTestCheck',
      '11)studentQuestionComplaint', '12)teacherQuestionCreation', '13)adminQuestionCreation', '14)teacherTaskCreation',
      '15)adminTaskCreation', '16)teacherTaskBlock', '17)adminTaskBlock', '18)teacherRightsToStudentDelegation',
      '19)adminRightsToStudentDelegation', '20)adminRightsToTeacherTransfer'],
  },
  userType: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
  },
  userId: mongoose.SchemaTypes.ObjectId,
  toUserType: {
    type: String,
    enum: ['student', 'teacher', 'admin'],
  },
  toUserId: mongoose.SchemaTypes.ObjectId,
  groupId: mongoose.SchemaTypes.ObjectId,
  taskId: mongoose.SchemaTypes.ObjectId,
  questionId: mongoose.SchemaTypes.ObjectId,
  testTopicsIds: [mongoose.SchemaTypes.ObjectId],
  testAttemptId: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model('Activities', ActivitiesSchema);
