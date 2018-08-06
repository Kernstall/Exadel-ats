const mongoose = require('mongoose');

const language = mongoose.Schema({
  language: ['java', 'cpp', 'c'],
});

module.exports = mongoose.model('Language', language);
