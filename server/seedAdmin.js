require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('./src/models/Admin');

const seedAdmin = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aarambh3', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB...');

    const email = 'admin@gec.jamui.ac.in';
    const password = 'admin123'; // Default password

    // Check if admin already exists
    let admin = await Admin.findOne({ email });
    if (admin) {
      console.log(`\nAdmin user with email "${email}" already exists.`);
      process.exit(0);
    }

    // Hash the password securely
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Save the new admin
    admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    console.log(`\nSUCCESS: Default Admin user successfully created!`);
    console.log(`-----------------------------------`);
    console.log(`Email:    ${email}`);
    console.log(`Password: ${password}`);
    console.log(`-----------------------------------`);
    console.log(`Please login via the /admin portal using these credentials.`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding admin:', error);
    process.exit(1);
  }
};

seedAdmin();
