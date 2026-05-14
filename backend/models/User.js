const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    enrollmentNumber: String,
    password: String,
<<<<<<< HEAD
    role: String,
    fullName: String,
    email: String,
    phone: String,   
    course: String,
    branch: String,
    photo: String
=======
    role: String
>>>>>>> 1dbbcb7a5d70d11a78e60eabe722f561d24400e3
});

module.exports = mongoose.models.User || mongoose.model('User', userSchema);