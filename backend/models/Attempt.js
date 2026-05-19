const mongoose = require('mongoose');

const attemptSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    quizId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },

    quizTitle: String,

    score: Number,

    totalMarks: Number,

    correct: Number,

    wrong: Number

}, {
    timestamps: true
});

module.exports =
    mongoose.model('Attempt', attemptSchema);