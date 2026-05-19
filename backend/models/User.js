const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    enrollmentNumber: String,
    password: String,
    role: String,
    fullName: String,
    email: String,
    phone: String,   
    course: String,
    branch: String,
    photo: String
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);