const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/fittrack', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));  // Serve static files from 'public' directory

// Serve login and signup pages
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));  // Root route serves login.html
});

app.get('/signup', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'signup.html'));  // Serve signup page
});

// Routes
const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

// Starting Server on port 1000
const PORT = 3002;
app.listen(PORT, () => console.log(`Login/Signup server running on http://localhost:${PORT}`));
