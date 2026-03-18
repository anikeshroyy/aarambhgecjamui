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
    
    // Add decoded user (admin ID) to request object
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

module.exports = { verifyToken };
