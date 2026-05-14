const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');
const authRoutes = require('./routes/auth');
require('dotenv').config();
const User = require('./models/User');

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(helmet());

app.use(express.json());

app.use('/api/auth', authRoutes);

app.options('*', cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000,
    message: 'Too many requests from this IP'
});
// app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect('mongodb://aashma_gaykwad:aashma24@ac-jys7sib-shard-00-00.axg99rx.mongodb.net:27017,ac-jys7sib-shard-00-01.axg99rx.mongodb.net:27017,ac-jys7sib-shard-00-02.axg99rx.mongodb.net:27017/quizDB?ssl=true&replicaSet=atlas-gx9hg9-shard-0&authSource=admin&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// ========== MODELS ==========

// Quiz Model
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    timeLimit: { type: Number, required: true }, // in minutes
    negativeMark: {
        type: Number,
        default: 0
    },
    questions: [{
        questionText: String,
        options: [String],
        correctAnswer: Number
    }],
});

// Result Model
const resultSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    answers: [{
        questionId: { type: Number },
        selectedAnswer: { type: Number },
        isCorrect: { type: Boolean }
    }],
    score: { type: Number, required: true },
    totalMarks: { type: Number, required: true },
    percentage: { type: Number, required: true },
    submittedAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', quizSchema);
const Result = mongoose.model('Result', resultSchema);

// ========== MIDDLEWARE ==========

const authenticateToken = (req, res, next) => {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({
            message: 'No token provided'
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {

        const decoded = jwt.verify(token, 'secretkey');

        req.user = decoded;

        next();

    } catch (err) {

        return res.status(401).json({
            message: 'Invalid or expired token'
        });
    }
};

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// ===============================
// ========== QUIZ ROUTES ========
// ===============================

// GET ALL QUIZZES
app.get('/api/quiz', authenticateToken, async (req, res) => {

    try {

        const quizzes = await Quiz.find();

        res.json(quizzes);

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// ================= GET SINGLE QUIZ =================

app.get('/api/quiz/:id', authenticateToken, async (req, res) => {

    try {

        const quiz = await Quiz.findById(req.params.id);

        if (!quiz) {
            return res.status(404).json({
                success: false,
                message: 'Quiz not found'
            });
        }

        res.json({
            _id: quiz._id,
            title: quiz.title,
            timeLimit: quiz.timeLimit,
            negativeMark: quiz.negativeMark,
            questions: quiz.questions.map(q => ({
                questionText: q.questionText,
                options: q.options,
                correctAnswer: q.correctAnswer
            }))
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// CREATE QUIZ
app.post('/api/quiz', authenticateToken, async (req, res) => {

    try {

        const { title, timeLimit, questions, negativeMark } = req.body;

        if (!title || !timeLimit || !questions || questions.length === 0) {

            return res.status(400).json({
                message: 'All fields are required'
            });
        }

        const formattedQuestions = questions.map((q, index) => {

            if (!q.question || q.question.trim() === '') {
                throw new Error(`Question ${index + 1} is empty`);
            }

            if (!q.options || q.options.length < 4) {
                throw new Error(`Question ${index + 1} must have 4 options`);
            }

            const correctIndex =
                ['A', 'B', 'C', 'D'].indexOf(q.answer);

            if (correctIndex === -1) {
                throw new Error(
                    `Correct answer missing in Question ${index + 1}`
                );
            }

            return {
                questionText: q.question,
                options: q.options,
                correctAnswer: correctIndex
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

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});


// UPDATE QUIZ
app.put('/api/quiz/:id',
    authenticateToken,
    isAdmin,
    async (req, res) => {

        try {

            const updatedQuiz =
                await Quiz.findByIdAndUpdate(
                    req.params.id,
                    req.body,
                    { new: true }
                );

            res.json(updatedQuiz);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);


// DELETE QUIZ
app.delete('/api/quiz/:id',
    authenticateToken,
    isAdmin,
    async (req, res) => {

        try {

            await Quiz.findByIdAndDelete(req.params.id);

            res.json({
                success: true,
                message: 'Quiz deleted successfully'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);


// ===============================
// ========== ADMIN ROUTES =======
// ===============================


// GET ADMIN PROFILE
app.get('/api/auth/profile',
    authenticateToken,
    async (req, res) => {

        try {

            const user = await User.findById(req.user.userId)
                .select('-password');

            res.json(user);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);


// GET ALL STUDENTS
app.get('/api/admin/students',
    authenticateToken,
    isAdmin,
    async (req, res) => {

        try {

            const students = await User.find({
                role: 'student'
            }).select('-password');

            res.json(students);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);


// DELETE STUDENT
app.delete('/api/admin/student/:id',
    authenticateToken,
    isAdmin,
    async (req, res) => {

        try {

            await User.findByIdAndDelete(req.params.id);

            res.json({
                success: true,
                message: 'Student deleted successfully'
            });

        } catch (error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);


// ADMIN REPORTS
app.get('/api/admin/reports',
    authenticateToken,
    isAdmin,
    async (req, res) => {

        try {

            const reports = await Result.find()
                .populate('userId', 'username')
                .populate('quizId', 'title');

            const formattedReports = reports.map((r) => ({

                studentName: r.userId?.username,

                quizTitle: r.quizId?.title,

                score: r.score,

                percentage: r.percentage
            }));

            res.json(formattedReports);

        } catch (error) {

            res.status(500).json({
                message: error.message
            });
        }
    }
);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}
);