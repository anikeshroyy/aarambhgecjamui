const mongoose = require('mongoose');
require('dotenv').config();

const AdminSchema = new mongoose.Schema({
  email: String,
  role: String
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

async function checkAdmins() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected successfully!');

    const admins = await Admin.find({});
    console.log('\n--- Admin Accounts in Database ---');
    admins.forEach(admin => {
      console.log(`Email: ${admin.email.padEnd(30)} | Role: ${admin.role || 'MISSING'}`);
    });
    console.log('----------------------------------\n');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Error:', err);
    process.exit(1);
  }
}

checkAdmins();
