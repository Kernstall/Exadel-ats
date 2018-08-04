const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  teacherId: mongoose.SchemaTypes.ObjectId,
  firstName: String,
  fathersName: String,
  lastName: String,
  groupName: {
    type: String,
    unique: true,
  },
  studentIdList: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }],
  topicCourseIds: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'TopicCourse',
  },
});

module.exports = mongoose.model('Group', GroupSchema);
