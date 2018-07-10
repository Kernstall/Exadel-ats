const mongoose = require('mongoose');
const Question = require('./Question.js');
const Task = require('./Task.js');
const TopicCourse = require('./TopicCourse.js');


async function connectDatabase() {
    mongoose.Promise = global.Promise;
    mongoose.connect('mongodb://localhost:27017/')
        .then(() => {
            console.log('Connected to database!!!');
        })
        .catch((err) => {
            throw new Error(err);
        });
}

let tmp2 = new Question({
    creatorId: mongoose.Types.ObjectId('5b43bceae2aa2707480967da'),
    topicId: mongoose.Types.ObjectId('5b43bceae2aa2764480967da'),
    tags: ['qqq', 'www'],
    description: 'ddd',
    correctAnswersIndexes: [1, 3],
    answersVariants: ['ttt', 'yuuu'],
    kind: 'one answer',
    correntAnswersCount: 5,
    wrongAnswersCount: 6,
    difficultyRate: 4,
    isTraining: true,
    isBlocked: false,
    haveCheckedReport: false,
});


tmp2.save((err) => {
    if (err) {
        throw new Error(err);
    }
});


let tmp = new TopicCourse({
    name: 'name',
    topicsIds: [
        mongoose.Types.ObjectId('5b43bceae2aa2707480967da'), mongoose.Types.ObjectId('5b43bceae2aa2707480967da'),
    ],
});

tmp.save((err) => {
    if (err) {
        throw new Error(err);
    }
});

let tmp1 = new Task({
    description: 'eee',
    name: 'hhh',
    weight: 5.5,
    topicsIds: [
        mongoose.Types.ObjectId('5b43bceae2442707480967da'), mongoose.Types.ObjectId('5b43bceae2aa2704480967da'),
    ],
    language: 'java',
    tags: ['adsf', 'adsfd'],
    tests:
        [
            {
                inputFileAdress: 'ewrefg',
                outputFileAdress: 'dfgvbg',
                weight: 2,
            },
        ],
    passResult: 12.154,
});

tmp1.save((err) => {
    if (err) {
        throw new Error(err);
    }
});

connectDatabase();
