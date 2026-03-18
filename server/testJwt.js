require('dotenv').config();
const jwt = require('jsonwebtoken');

const token = jwt.sign({ id: 'dummy123' }, process.env.JWT_SECRET || 'aarambh_jwt_secret_key_123', { expiresIn: '1h' });
console.log('Test JWT:', token);

// Now try to verify it the same way the backend does
try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET || 'aarambh_jwt_secret_key_123');
  console.log('Decoded Payload:', decoded);
} catch (e) {
  console.error('Verify failed:', e);
}
