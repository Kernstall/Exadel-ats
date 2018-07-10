const mongoose = require('mongoose');

const question = mongoose.Schema({
    creatorId: mongoose.Schema.Types.ObjectId,
    topicId: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model('question', question);
