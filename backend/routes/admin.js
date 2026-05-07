const express = require('express');
const router = express.Router();
const Student = require('../models/Student');


// 🔹 GET ALL STUDENTS
router.get('/students', async (req, res) => {
  const students = await Student.find().sort({ createdAt: -1 });
  res.json(students);
});


// 🔹 ADD STUDENT
router.post('/student', async (req, res) => {
  const newStudent = new Student(req.body);
  await newStudent.save();
  res.json({ message: 'Student added' });
});


// 🔹 UPDATE STUDENT
router.put('/student/:id', async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: 'Student updated' });
});


// 🔹 DELETE STUDENT
router.delete('/student/:id', async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: 'Student deleted' });
});

module.exports = router;