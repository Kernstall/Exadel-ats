const mongoose = require('mongoose');

const GroupSchema = new mongoose.Schema({
  description: String,
  name: {
    type: String,
    unique: true,
  },
  weight: Number, // 1-10
  topicsIds: [mongoose.SchemaTypes.ObjectId],
  language: String, // Java ect
  tags: [String],
  tests:
    [{
      inputFileAdress: String,
      outputFileAdress: String,
      weight: Number, // 1-10
    }],
  passResult: Number,
});

module.exports = mongoose.model('Group', GroupSchema);
