const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String
});

// ✅ FIX HERE
module.exports = mongoose.models.User || mongoose.model('User', userSchema);