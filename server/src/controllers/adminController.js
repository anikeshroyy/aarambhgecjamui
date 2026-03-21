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
    let admin = await Admin.findOne({ email });
    if (!admin) {
      // Create seed admin if none exists (for first time setup)
      if (email === 'admin@gec.jamui.ac.in' && password === 'admin123') {
        console.log('[Auth] Admin not found. Seeding first default admin (Global)...');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        admin = new Admin({ email, password: hashedPassword, role: 'global' });
        await admin.save();
        
        console.log('[Auth] Global Admin successfully created and authenticated.');
      } else {
        console.log(`[Auth] No admin found matching exactly: "${email}". Failing.`);
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }

    // Check password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      console.log(`[Auth] Passwords do not match for user ${email}. Failing.`);
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Migrating legacy admins / ensuring primary admin is always global
    if (admin.email === 'admin@gec.jamui.ac.in' && admin.role !== 'global') {
      admin.role = 'global';
      await admin.save();
      console.log(`[Auth] Upgraded primary admin to global role`);
    }

    // Generate token
    console.log(`[Auth] Password valid. Emitting token for: ${email} (${admin.role})`);
    const token = jwt.sign(
      { id: admin._id, role: admin.role }, 
      process.env.JWT_SECRET || 'aarambh_jwt_secret_key_123', 
      { expiresIn: '7d' }
    );

    res.json({ token, role: admin.role });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

const verify = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user.id).select('-password');
    if (!admin) {
      return res.status(401).json({ valid: false, error: 'Admin not found' });
    }
    res.json({ valid: true, user: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ valid: false, error: 'Verification failed' });
  }
};

// Admin Management (Global only)
const createAdmin = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    
    let admin = await Admin.findOne({ email });
    if (admin) return res.status(400).json({ error: 'Admin already exists' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    admin = new Admin({ email, password: hashedPassword, role });
    await admin.save();
    
    res.json({ message: 'Admin created successfully', admin: { id: admin._id, email: admin.email, role: admin.role } });
  } catch (error) {
    res.status(500).json({ error: 'Server error creating admin' });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find().select('-password');
    res.json(admins);
  } catch (error) {
    res.status(500).json({ error: 'Server error fetching admins' });
  }
};

const deleteAdmin = async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ error: 'Admin not found' });
    if (admin.role === 'global') return res.status(403).json({ error: 'Cannot delete global admin' });

    await Admin.findByIdAndDelete(req.params.id);
    res.json({ message: 'Admin removed successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Server error deleting admin' });
  }
};

module.exports = {
  login,
  verify,
  createAdmin,
  getAdmins,
  deleteAdmin
};
