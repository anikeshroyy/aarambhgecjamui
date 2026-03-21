require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const bcrypt = require('bcryptjs');

// Connect Database & Seed Admins
connectDB().then(async () => {
  try {
    const Admin = require('./models/Admin');
    const adminsToSeed = [
      { email: 'admin@gec.jamui.ac.in',      password: 'admin123',     role: 'global' },
      { email: 'technical@gec.jamui.ac.in',   password: 'tech123',      role: 'technical' },
      { email: 'cultural@gec.jamui.ac.in',    password: 'cultural123',  role: 'cultural' },
      { email: 'sports@gec.jamui.ac.in',      password: 'sports123',    role: 'sports' },
    ];

    for (const data of adminsToSeed) {
      const existing = await Admin.findOne({ email: data.email });
      if (!existing) {
        const salt = await bcrypt.genSalt(10);
        const hashed = await bcrypt.hash(data.password, salt);
        await Admin.create({ email: data.email, password: hashed, role: data.role });
        console.log(`[Seed] Created admin: ${data.email} (${data.role})`);
      } else if (existing.role !== data.role) {
        existing.role = data.role;
        await existing.save();
        console.log(`[Seed] Updated admin role: ${data.email} -> ${data.role}`);
      }
    }
    console.log('[Seed] Admin seeding complete.');
  } catch (err) {
    console.error('[Seed] Error seeding admins:', err.message);
  }
});

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files locally
// This maps requests like http://localhost:5000/uploads/image.jpg to the physical uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));
app.use('/api/team', require('./routes/team'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/sponsors', require('./routes/sponsors'));

// Basic health check
app.get('/', (req, res) => {
  res.send('Aarambh 3.0 API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
