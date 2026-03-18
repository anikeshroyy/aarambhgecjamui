require('dotenv').config();
const mongoose = require('mongoose');
const Admin = require('./src/models/Admin');
const bcrypt = require('bcryptjs');

const checkDb = async () => {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aarambh3');
  const admin = await Admin.findOne({ email: 'admin@gec.jamui.ac.in' });
  console.log('Admin found:', admin);
  
  if (admin) {
    const isMatch = await bcrypt.compare('admin123', admin.password);
    console.log('Password match:', isMatch);
  }
  process.exit();
};

checkDb();
