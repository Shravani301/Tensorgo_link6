const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// User model and authentication functions
const { User, authenticateUser, generateToken } = require('../controllers/authController');

// Register route
router.post('/register', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.json({ user, token: generateToken(user) });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed.' });
  }
});

// Login route
router.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
  res.json({ user: req.user, token: generateToken(req.user) });
});

// Profile route (protected route)
router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json(req.user);
});

module.exports = router;
