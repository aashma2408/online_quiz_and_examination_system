const express = require('express');
const router = express.Router();

const Attempt = require('../models/Attempt');

router.get('/reports', async (req, res) => {
  try {

    const reports = await Attempt.find()
      .populate('user', 'fullName enrollmentNumber')
      .sort({ createdAt: -1 })
      .populate('quizId', 'title');

      console.log('ATTEMPTS FROM DB:', reports);

    res.json(reports);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;