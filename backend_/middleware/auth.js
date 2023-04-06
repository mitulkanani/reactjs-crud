const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.userId});
    console.log(decoded, user);
    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.userId = user._id;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: error });
  }
};

module.exports = auth;
