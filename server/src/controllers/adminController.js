const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
  try {
    const { email: rawEmail, password } = req.body;

    if (!rawEmail || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const email = rawEmail.trim().toLowerCase();
    console.log(`\n[Auth] Login attempt received for email: "${email}"...`);

    // Find admin by email
    const admin = await Admin.findOne({ email });
    if (!admin) {
      // Create seed admin if none exists (for first time setup)
      if (email === 'admin@gec.jamui.ac.in' && password === 'admin123') {
        console.log('[Auth] Admin not found. Seeding first default admin...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newAdmin = new Admin({ email, password: hashedPassword });
        await newAdmin.save();
        
        console.log('[Auth] Admin successfully created and authenticated.');
        const token = jwt.sign({ id: newAdmin._id }, process.env.JWT_SECRET || 'aarambh_jwt_secret_key_123', { expiresIn: '7d' });
        return res.json({ token, message: 'Initial admin created and logged in' });
      }
      
      console.log(`[Auth] No admin found matching exactly: "${email}". Failing.`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log(`[Auth] Passwords do not match for user ${email}. Failing.`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate token
    console.log(`[Auth] Password valid. Emitting token for: ${email}`);
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET || 'aarambh_jwt_secret_key_123', { expiresIn: '7d' });

    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

const verify = async (req, res) => {
  // If the request made it past the auth middleware, the token is valid
  res.json({ valid: true, user: req.user });
};

module.exports = {
  login,
  verify
};
