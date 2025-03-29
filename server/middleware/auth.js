import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import uniqueValidator from 'mongoose-unique-validator';

// Middleware to authenticate the user
const Auth = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error();
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Please authenticate.' });
  }
};

export default Auth; 