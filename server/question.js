const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const question = mongoose.Schema({
    creatorId: mongoose.Schema.Types.ObjectId,
    topicId: mongoose.Schema.Types.ObjectId,
    tags: [String],
    description: String,
    correctAnswersIndexes: [Int32],
    answersVariants: [String],
    kind: {
        type: String,
        enum: ['one answer', 'multiple answers', 'without answer option', 'without answer with verification'],
    },
    correntAnswersCount: Int32,
    wrongAnswersCount: Int32,
    difficultyRate: Int32,
    isTraining: Boolean,
    isBlocked: Boolean,
    haveCheckedReport: Boolean,
});

module.exports = mongoose.model('question', question);
