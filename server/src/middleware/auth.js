const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];
    
    // JWT verification
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aarambh_jwt_secret_key_123');
    
    // Add decoded user (admin ID and role) to request object
    req.user = decoded;
    
    next();
  } catch (error) {
    console.error('Auth verification error:', error);
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Unauthorized: Token expired' });
    }
    return res.status(403).json({ error: 'Unauthorized: Invalid token' });
  }
};

const checkRole = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions for this action' });
    }
    next();
  };
};

module.exports = { verifyToken, checkRole };
