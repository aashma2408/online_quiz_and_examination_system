const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

// REGISTER
router.post('/register', async (req, res) => {
  try {

    const {
      username,
      enrollmentNumber,
      password,
      role,
      fullName,
      email,
      phone,
      course,
      branch
    } = req.body;
    const { username, password, role } = req.body;

    // check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ ADD YOUR LINE HERE
    const user = new User({
      username,
      enrollmentNumber,
      password: hashedPassword,
      role: role || 'student',
      fullName,
      email,      
      phone,
      course,
      branch
    });

    await user.save();

    console.log("SAVED USER:", user);

    // ✅ Send complete user data back
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        fullName: user.fullName,
        enrollmentNumber: user.enrollmentNumber,
        email: user.email,
        phone: user.phone,
        course: user.course,
        branch: user.branch,
        role: user.role,
        username: user.username
      }
    });
    res.status(201).json({ message: 'User registered successfully' });

  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  try {

    console.log(req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const jwt = require('jsonwebtoken');

    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      'secretkey',
      { expiresIn: '100d' }
    );

    res.json({
      token,
      role: user.role,
      user: {
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        course: user.course,
        branch: user.branch,
        role: user.role,
        username: user.username,
      }
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

// GET ALL REGISTERED STUDENTS
router.get('/students', async (req, res) => {

  try {

    const students = await User.find(
      { role: 'student' },
      {
        password: 0
      }
    );

    res.json(students);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});

module.exports = router;