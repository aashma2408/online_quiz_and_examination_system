const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const User = require('./models/User');
const Attempt = require('./models/Attempt');
const reportRoutes = require('./routes/report');

const app = express();

app.use(cors({
    origin:  process.env.FRONTEND_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(helmet());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.use('/api', reportRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

// ================= QUIZ MODEL =================

const quizSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    timeLimit: {
        type: Number,
        required: true
    },

    negativeMark: {
        type: Number,
        default: 0
    },

    marksPerQuestion: {
        type: Number,
        default: 1
    },

    questions: [
        {
            questionText: String,
            options: [String],
            correctAnswer: Number
        }
    ]
});

const Quiz = mongoose.model('Quiz', quizSchema);


// ================= AUTH MIDDLEWARE =================

const authenticateToken = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {

        return res.status(401).json({
            message: 'No token provided'
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: 'Invalid token'
        });
    }
};


// ================= ADMIN CHECK =================

const isAdmin = async (req, res, next) => {

    try {

        const user = await User.findById(req.user.userId);

        if (!user || user.role !== 'admin') {

            return res.status(403).json({
                message: 'Admin access required'
            });
        }

        next();

    } catch (err) {

        res.status(500).json({
            message: 'Server Error'
        });
    }
};


// ================= GET ALL QUIZZES =================

app.get('/api/quiz', authenticateToken, async (req, res) => {

    try {

        const quizzes = await Quiz.find();

        res.json(quizzes);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= PREVIOUS ATTEMPTS =================

app.get('/api/quiz/my-attempts', authenticateToken, async (req, res) => {

    try {

        const attempts = await Attempt.find({
            user: req.user.userId
        }).sort({ createdAt: -1 });

        res.json(attempts);

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});


// ================= GET SINGLE QUIZ =================

app.get('/api/quiz/:id', authenticateToken, async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({
                message: 'Quiz not found'
            });
        }

        res.json(quiz);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });
    }
});


// ================= CREATE QUIZ =================

app.post('/api/quiz', authenticateToken, async (req, res) => {

    try {

        const {
            title,
            timeLimit,
            questions,
            negativeMark
        } = req.body;

        const formattedQuestions = questions.map(q => {

            return {
                questionText: q.question,
                options: q.options,
                correctAnswer:
                    ['A', 'B', 'C', 'D'].indexOf(q.answer)
            };
        });

        const quiz = new Quiz({

            title,
            timeLimit,
            negativeMark: negativeMark || 0,
            questions: formattedQuestions
        });

        await quiz.save();

        res.status(201).json({

            success: true,
            message: 'Quiz created successfully',
            quiz
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: err.message
        });
    }
});

// ================= SUBMIT QUIZ =================

app.post('/api/quiz/:id/submit', authenticateToken, async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {

            return res.status(404).json({
                message: 'Quiz not found'
            });
        }

        const answers = req.body.answers;

        let correct = 0;
        let wrong = 0;

        const marksPerQuestion =
            quiz.marksPerQuestion || 1;

        const negativeMark =
            quiz.negativeMark || 0;

        // CHECK ANSWERS

        quiz.questions.forEach((q, index) => {

            if (answers[index] == q.correctAnswer) {

                correct++;

            } else if (
                answers[index] !== undefined &&
                answers[index] !== null
            ) {

                wrong++;
            }
        });

        // CALCULATE SCORE

        const score =
            (correct * marksPerQuestion) -
            (wrong * negativeMark);

        const totalMarks =
            quiz.questions.length *
            marksPerQuestion;

        // SAVE ATTEMPT

        await Attempt.create({

            user: req.user.userId,

            quizId: quiz._id,

            quizTitle: quiz.title,

            score,

            totalMarks,

            correct,

            wrong
        });

        console.log('ATTEMPT SAVED');

        // RESPONSE

        res.json({

            success: true,

            score,
            correct,
            wrong,

            totalQuestions:
                quiz.questions.length,

            totalMarks
        });

    } catch (err) {

        console.log(err);

        res.status(500).json({
            message: 'Server Error'
        });
    }
});

// ================= ADMIN REPORTS =================

app.get(
    '/api/admin/reports',
    authenticateToken,
    isAdmin,
    async (req, res) => {

        try {

            const reports = await Attempt.find()

                .populate('user')

                .sort({ createdAt: -1 });

            console.log('REPORTS:', reports);

            const formattedReports =
                reports.map((r) => ({

                    enrollmentNumber:
                        r.user?.enrollmentNumber || 'N/A',

                    fullName:
                        r.user?.fullName ||
                        r.user?.fullname ||
                        r.user?.username ||+
                        'Unknown',

                    quizTitle:
                        r.quizTitle || 'N/A',

                    score:
                        r.score || 0,

                    totalMarks:
                        r.totalMarks || 0,

                    correct:
                        r.correct || 0,

                    wrong:
                        r.wrong || 0,

                    createdAt:
                        r.createdAt
                }));

            res.json(formattedReports);

        } catch (err) {

            console.log(err);

            res.status(500).json({
                message: 'Server Error'
            });
        }
    }
);


// ================= START SERVER =================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});