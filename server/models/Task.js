const mongoose = require('mongoose');

const task = mongoose.Schema({
  description: String,
  name: {
    type: String,
    unique: true,
  },
  weight: {
    type: Number,
    min: 1,
    max: 10,
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  },
  language: String,
  tags: [String],
  tests:
    [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          unique: true,
        },
        weight: {
          type: Number,
          min: 1,
          max: 10,
        },
      }],
  passResult: Number,
});

module.exports = mongoose.model('Task', task);
