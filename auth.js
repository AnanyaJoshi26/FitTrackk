const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Ensure the path to your User model is correct
const router = express.Router();

// Route for user registration
router.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash the password before saving
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Route for user login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'User not found' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Redirect to the new URL after successful login
        res.redirect('http://127.0.0.1:5500/fitnesstracking/public/index.html');
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
