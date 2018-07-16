const mongoose = require('mongoose');

const topicCourse = new mongoose.Schema({
  name: String,
  topicsIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  }],
});

module.exports = mongoose.model('TopicCourse', topicCourse);
