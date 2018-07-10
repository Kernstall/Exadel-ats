const mongoose = require('mongoose');

const ActivitiesSchema = new mongoose.Schema({
  type: String, // (Enum)
  userType: String,
  userId: mongoose.SchemaTypes.ObjectId,
  toUserType: String,
  toUserId: mongoose.SchemaTypes.ObjectId,
  groupId: mongoose.SchemaTypes.ObjectId,
  taskId: mongoose.SchemaTypes.ObjectId,
  questionId: mongoose.SchemaTypes.ObjectId,
  testTopicsIds: [mongoose.SchemaTypes.ObjectId],
  testAttemptId: mongoose.SchemaTypes.ObjectId,
});

module.exports = mongoose.model('Activities', ActivitiesSchema);
