const mongoose = require('mongoose');

// Define user schema
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

// Create User model
const User = mongoose.model('User', UserSchema);

module.exports = User;
