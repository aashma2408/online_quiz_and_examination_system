const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
  try {
    const { username, password, role } = req.body;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({ username, password: hashedPassword, role });
    await user.save();

    res.json({ message: 'User registered successfully' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    res.json({
      token: 'dummy-token',
      role: user.role,
      user: user   
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// TEST DATA (temporary)
router.get('/quizzes', (req, res) => {
  res.json([
    {
      _id: "123",
      title: "DBMS Test",
      subject: "Database",
      timeLimit: 30,
      questions: []
    }
  ]);
});

// PROFILE
router.get('/profile/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      _id: user._id,
      username: user.username,
      role: user.role
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;