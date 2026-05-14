const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  title: String,
  time: Number,
  negativeMark: Number,
  questions: [
    {
      question: String,
      options: [String],
      answer: Number
    }
  ]
});

module.exports = mongoose.model('Quiz', quizSchema);