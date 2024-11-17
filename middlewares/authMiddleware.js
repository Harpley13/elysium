const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).send({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'secretkey');
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).send({ message: 'Invalid token' });
  }
};

module.exports = authMiddleware;
