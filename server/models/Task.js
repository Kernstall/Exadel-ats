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
  topicId: mongoose.Schema.Types.ObjectId,
  language: String,
  tags: [String],
  tests:
    [
      {
        inputFileAdress: String,
        outputFileAdress: String,
        weight: {
          type: Number,
          min: 1,
          max: 10,
        },
      }],
  passResult: Number,
});

module.exports = mongoose.model('task', task);
