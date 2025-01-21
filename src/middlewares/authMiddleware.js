const jwt = require('jsonwebtoken');
const { User, Role } = require('../models/associations');

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const user = await User.findByPk(decoded.id);

    if (!user) {
      return res.status(401).json({ error: 'Invalid token.' });
    }

    req.user.role = user.roleId
    next();
  } catch (err) {
    res.status(401).json({ error: 'Invalid or expired token.' });
  }
};

const authorize = (...allowedRoles) => {
  return async (req, res, next) => {
    let allow = [];
    for (let element of allowedRoles) {
      const role = await Role.findOne({ where: { name: element } });-
      allow.push(role.id);
    }
    if (!allow.includes(req.user.role)) {
      return res.status(403).json({ error: 'Access denied. You do not have the required role.' });
    }
    next();
  };
};


module.exports = { authMiddleware, authorize };
