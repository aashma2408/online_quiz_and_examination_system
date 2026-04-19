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

// Security Middleware
app.use(cors());
app.use(helmet());

app.use(express.json());


app.options('*', cors());

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100,
    message: 'Too many requests from this IP'
});
app.use('/api/', limiter);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/quiz_system', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// ========== MODELS ==========

// Quiz Model
const quizSchema = new mongoose.Schema({
    title: { type: String, required: true },
    subject: { type: String, required: true, enum: ['dbms', 'os', 'computer networks'] },
    timeLimit: { type: Number, required: true }, // in minutes
    questions: [{
        questionText: { type: String, required: true },
        options: [{ type: String, required: true }],
        correctAnswer: { type: Number, required: true }, // index of correct option
        explanation: { type: String }
    }],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
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
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Access denied' });
    }
    
    jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key', (err, user) => {
        if (err) return res.status(403).json({ message: 'Invalid token' });
        req.user = user;
        next();
    });
};

const isAdmin = async (req, res, next) => {
    const user = await User.findById(req.user.userId);
    if (user.role !== 'admin') {
        return res.status(403).json({ message: 'Admin access required' });
    }
    next();
};

// ========== QUIZ ROUTES ==========

// Get all quizzes (with optional subject filter)
app.get('/api/quizzes', authenticateToken, async (req, res) => {
    try {
        const { subject } = req.query;
        let filter = {};
        if (subject) filter.subject = subject;
        
        const quizzes = await Quiz.find(filter).select('-questions.correctAnswer');
        res.json(quizzes);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get single quiz with shuffled questions
app.get('/api/quiz/:id', authenticateToken, async (req, res) => {
    try {
        const quiz = await Quiz.findById(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        
        // Shuffle questions for each user
        const shuffledQuestions = [...quiz.questions];
        for (let i = shuffledQuestions.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]];
        }
        
        const quizData = {
            _id: quiz._id,
            title: quiz.title,
            subject: quiz.subject,
            timeLimit: quiz.timeLimit,
            questions: shuffledQuestions.map(q => ({
                questionText: q.questionText,
                options: q.options,
                _id: q._id
            }))
        };
        
        res.json(quizData);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Submit quiz
app.post('/api/submit', authenticateToken, async (req, res) => {
    try {
        const { quizId, answers, timeSpent } = req.body;
        
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        
        let score = 0;
        const evaluatedAnswers = [];
        
        quiz.questions.forEach((question, index) => {
            const userAnswer = answers[index];
            const isCorrect = userAnswer === question.correctAnswer;
            if (isCorrect) score++;
            
            evaluatedAnswers.push({
                questionId: index,
                selectedAnswer: userAnswer,
                isCorrect: isCorrect,
                correctAnswer: question.correctAnswer,
                questionText: question.questionText,
                options: question.options,
                explanation: question.explanation
            });
        });
        
        const totalMarks = quiz.questions.length;
        const percentage = (score / totalMarks) * 100;
        
        const result = new Result({
            userId: req.user.userId,
            quizId: quizId,
            answers: evaluatedAnswers,
            score: score,
            totalMarks: totalMarks,
            percentage: percentage
        });
        
        await result.save();
        
        res.json({
            score,
            totalMarks,
            percentage,
            answers: evaluatedAnswers,
            message: 'Quiz submitted successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

app.use('/api/auth', authRoutes);

// Get user results
app.get('/api/results', authenticateToken, async (req, res) => {
    try {
        const results = await Result.find({ userId: req.user.userId })
            .populate('quizId', 'title subject')
            .sort({ submittedAt: -1 });
        res.json(results);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ========== ADMIN ROUTES ==========

// Create quiz
app.post('/api/admin/quiz', authenticateToken, isAdmin, async (req, res) => {
    try {
        const { title, subject, timeLimit, questions } = req.body;
        
        const quiz = new Quiz({
            title,
            subject,
            timeLimit,
            questions,
            createdBy: req.user.userId
        });
        
        await quiz.save();
        res.status(201).json({ message: 'Quiz created successfully', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Update quiz
app.put('/api/admin/quiz/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz updated successfully', quiz });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Delete quiz
app.delete('/api/admin/quiz/:id', authenticateToken, isAdmin, async (req, res) => {
    try {
        const quiz = await Quiz.findByIdAndDelete(req.params.id);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// Get all users (admin)
app.get('/api/admin/users', authenticateToken, isAdmin, async (req, res) => {
    try {
        const users = await User.find().select('-password');
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
