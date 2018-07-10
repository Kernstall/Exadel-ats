const mongoose = require('mongoose');

const topicCourse = new mongoose.Schema({
  name: String,
  topicsIds: [mongoose.Schema.Types.ObjectId],
});

module.exports = mongoose.model('topicCourse', topicCourse);
