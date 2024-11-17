const roleMiddleware = (roles) => (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).send({ message: 'Access Denied' });
    }
    next();
  };
  
  module.exports = roleMiddleware;
  