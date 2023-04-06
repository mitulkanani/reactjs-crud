const express = require('express');
const authRoutes = require('./auth');
const todoRoutes = require('./todo');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({ message: 'Welcome to my API' });
});

// Mount the authentication routes
router.use('/auth', authRoutes);
router.use('/todo', todoRoutes);


module.exports = router;
