const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  try {
    const token = req.header('Authorization');
    if (!token) return res.status(401).json({ message: 'Access Denied: No token provided' });

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified; // attaches user info to request
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = authMiddleware;
