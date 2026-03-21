/**
 * Seed Script: Creates 3 role-based admin accounts + ensures global admin exists
 * 
 * Run: node seedAdmins.js
 * 
 * Accounts created:
 *   1. admin@gec.jamui.ac.in      | password: admin123     | role: global
 *   2. technical@gec.jamui.ac.in   | password: tech123      | role: technical
 *   3. cultural@gec.jamui.ac.in    | password: cultural123  | role: cultural
 *   4. sports@gec.jamui.ac.in      | password: sports123    | role: sports
 */

require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['global', 'technical', 'cultural', 'sports'], default: 'technical' }
}, { timestamps: true });

const Admin = mongoose.model('Admin', AdminSchema);

const adminsToSeed = [
  { email: 'admin@gec.jamui.ac.in',      password: 'admin123',     role: 'global' },
  { email: 'technical@gec.jamui.ac.in',   password: 'tech123',      role: 'technical' },
  { email: 'cultural@gec.jamui.ac.in',    password: 'cultural123',  role: 'cultural' },
  { email: 'sports@gec.jamui.ac.in',      password: 'sports123',    role: 'sports' },
];

async function seed() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected!\n');

    for (const adminData of adminsToSeed) {
      const existing = await Admin.findOne({ email: adminData.email });

      if (existing) {
        // Update role if it changed
        if (existing.role !== adminData.role) {
          existing.role = adminData.role;
          await existing.save();
          console.log(`✅ UPDATED  ${adminData.email.padEnd(32)} role -> ${adminData.role}`);
        } else {
          console.log(`⏭️  EXISTS   ${adminData.email.padEnd(32)} role: ${existing.role}`);
        }
      } else {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(adminData.password, salt);
        await Admin.create({ email: adminData.email, password: hashedPassword, role: adminData.role });
        console.log(`🆕 CREATED  ${adminData.email.padEnd(32)} role: ${adminData.role}`);
      }
    }

    console.log('\n--- All Admin Accounts ---');
    const allAdmins = await Admin.find().select('-password');
    allAdmins.forEach(a => {
      console.log(`  ${a.email.padEnd(35)} | ${a.role}`);
    });
    console.log('--------------------------');
    console.log('\nDone! You can now login with these credentials.');

    await mongoose.connection.close();
    process.exit(0);
  } catch (err) {
    console.error('Seed error:', err);
    process.exit(1);
  }
}

seed();
