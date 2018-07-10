const mongoose = require('mongoose');
const Int32 = require('mongoose-int32');

const task = mongoose.Schema({
    description: String,
    name: {
        type: String,
        unique: true,
    },
    weight: {
        type: Int32,
        min: 1,
        max: 10,
    },
    topicsIds: [mongoose.Schema.Types.ObjectId],
    language: String,
    tags: [String],
    tests:
        [
            {
                inputFileAdress: String,
                outputFileAdress: String,
                weight: {
                    type: Int32,
                    min: 1,
                    max: 10,
                },
            }],
    passResult: mongoose.Schema.Types.Decimal128,
});

module.exports = mongoose.model('task', task);
