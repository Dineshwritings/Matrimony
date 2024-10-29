const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Register superuser
router.post('/register/superuser', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role: 'superuser' });
    await newUser.save();
    res.status(201).json({ message: 'Superuser created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Register admin
router.post('/register/admin', async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hashedPassword, role: 'admin' });
    await newUser.save();
    res.status(201).json({ message: 'Admin created successfully!' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Login
// Login
router.post('/login', async (req, res) => {
    const { username, password, stayLoggedIn } = req.body; // Accept stayLoggedIn from the client
  
    try {
      const user = await User.findOne({ username });
      if (!user) return res.status(400).json({ error: 'Invalid credentials' });
  
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });
  
      // Set expiration based on stayLoggedIn flag
      const expiresIn = stayLoggedIn ? '7d' : '1h'; // Example: 7 days for stay logged in
  
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn });
      res.json({ token, role: user.role });
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  

  // Assuming you have a refresh token stored securely
router.post('/refresh', (req, res) => {
    const refreshToken = req.body.token; // Get the refresh token from the client
  
    if (!refreshToken) return res.sendStatus(401); // Unauthorized if no token
  
    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
      if (err) return res.sendStatus(403); // Forbidden if invalid token
  
      // Generate new access token
      const newToken = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token: newToken });
    });
  });
  



module.exports = router;
