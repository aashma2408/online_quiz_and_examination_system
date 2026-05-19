const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

    // Check existing user
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({
        message: 'User already exists'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
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

    // Send response
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

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server error'
    });

  }
});

// LOGIN
router.post('/login', async (req, res) => {

  try {

    console.log(req.body);

    const { username, password } = req.body;

    // Find user
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role
      },
      'secretkey',
      {
        expiresIn: '100d'
      }
    );

    // Send response
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
        username: user.username
      }
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message
    });

  }

});

// TEST DATA
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
      { password: 0 }
    );

    res.json(students);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: 'Server Error'
    });

  }

});


// PROFILE ROUTE
router.get('/profile', async (req, res) => {

  try {

    const authHeader = req.header('Authorization');

    if (!authHeader) {
      return res.status(401).json({
        message: 'No token'
      });
    }

    const token = authHeader.replace('Bearer ', '');

    const decoded = jwt.verify(token, 'secretkey');

    const user = await User.findById(decoded.userId)
      .select('-password');

    if (!user) {
      return res.status(404).json({
        message: 'User not found'
      });
    }

    res.json(user);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error'
    });
  }
});


// UPLOAD PROFILE PHOTO
router.put('/upload-photo/:id', async (req, res) => {

  try {

    const { photo } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { photo },
      { new: true }
    );

    res.json(updatedUser);

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: 'Server Error'
    });
  }
});

module.exports = router;