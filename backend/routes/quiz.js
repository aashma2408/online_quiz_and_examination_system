const router = require('express').Router();
const Quiz = require('../models/Quiz');

// CREATE
router.post('/quiz', authMiddleware, async (req, res) => {
  try {
    const quiz = new Quiz(req.body);
    await quiz.save();
    res.json({ message: "Quiz created" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to create quiz" });
  }
});

// GET ALL
router.get('/quiz', async (req, res) => {
  const quizzes = await Quiz.find();
  res.json(quizzes);
});

// GET ONE
router.get('/:id', async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  res.json(quiz);
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Quiz.findByIdAndDelete(req.params.id);
  res.json({ msg: 'Deleted' });
});

module.exports = router;