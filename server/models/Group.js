const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  teacherId: mongoose.SchemaTypes.ObjectId,
  groupName: {
    type: String,
    unique: true,
  },
  studentIdList: [mongoose.SchemaTypes.ObjectId],
  topicCourseIds: [mongoose.SchemaTypes.ObjectId],
});

module.exports = mongoose.model('Group', GroupSchema);
