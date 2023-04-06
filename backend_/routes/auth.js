const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const bcrypt = require('bcrypt');

const router = express.Router();

router.post('/signup', async (req, res) => {
  try {
    const saltRounds = 10;
    const { email, password, username } = req.body;
    // Check if email is already in use
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'Email already in use' });
    }
  
  
    // Hash the password
    bcrypt.hash(password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: err});
      }
  
      // Save the user to the database
      const user = new User({
        email,
        password: hash,
        username
      });
  
      try {
        await user.save();
        res.status(201).json({ message: 'User created successfully' });
      } catch (error) {
        res.status(500).json({ error: error });
      }
    });
  }
  catch (error) {
    console.error(error);
    res.status(500).json({ error });
  }
});

module.exports = router;

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  // Compare the hashed password with the plain-text password provided by the user
  bcrypt.compare(password, user.password, (err, result) => {
    if (err) {
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (result === true) {
      // Passwords match, create a JWT and return it to the client
      const token = jwt.sign(
        { userId: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
      );
      return res.status(200).json({ token });
    } else {
      return res.status(401).json({ error: 'Invalid email or password' });
    }
  });
});

module.exports = router;
