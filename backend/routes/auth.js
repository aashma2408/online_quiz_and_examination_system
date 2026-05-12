const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// REGISTER - FIXED
router.post('/register', async (req, res) => {
  try {
    const {
      username,
      password,
      role,
      fullName,
      email,
      phone,
      course,
      branch
    } = req.body;

    console.log("📝 Registration data:", req.body);

    // Check existing user
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create user with correct field names
    const user = new User({
      username,
      password: hashedPassword,
      role: role || 'student',
      fullName,
      email,        // ✅ Use email (not Email)
      phone,
      course,
      branch
    });

    await user.save();

    console.log("✅ Saved user:", user);

    // ✅ Send complete user data back
    res.status(201).json({
      message: 'User registered successfully',
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

  } catch (error) {
    console.error("❌ Registration error:", error);
    res.status(500).json({ message: 'Server error: ' + error.message });
  }
});




// LOGIN - FIXED
router.post('/login', async (req, res) => {
  try {
    console.log("🔐 Login request:", req.body);

    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET || 'your_secret_key',
      { expiresIn: '7d' }
    );

    // ✅ Send complete user data (matching your component expectations)
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
    console.error("❌ Login error:", err);
    res.status(500).json({ message: err.message });
  }
});

// GET PROFILE
router.get('/profile', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];

    if (!token) {
      return res.status(401).json({ message: 'No token' });
    }

    const decoded = jwt.verify(
     token,
     process.env.JWT_SECRET || 'your_secret_key'
    );
    
    const user = await User.findById(decoded.userId).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);

  } catch (err) {

    console.error("❌ Profile error:", err);

    if (err.name === 'TokenExpiredError') {

      return res.status(401).json({
        message: 'Token expired. Please login again.'
      });

    }

    res.status(401).json({
      message: 'Invalid token'
    });
  }
});


// UPLOAD PHOTO
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
      message: 'Error uploading photo'
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

module.exports = router;