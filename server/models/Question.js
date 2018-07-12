const mongoose = require('mongoose');

const question = mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Users',
  },
  topicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Topic',
  },
  tags: [String],
  description: String,
  correctAnswersIndexes: [Number],
  answersVariants: [String],
  kind: {
    type: String,
    enum: ['one answer', 'multiple answers', 'without answer option', 'without answer with verification'],
  },
  correntAnswersCount: Number,
  wrongAnswersCount: Number,
  difficultyRate: Number,
  isTraining: Boolean,
  isBlocked: Boolean,
  haveCheckedReport: Boolean,
});

module.exports = mongoose.model('Question', question);
