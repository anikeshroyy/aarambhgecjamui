const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');
const Team = require('./src/models/Team');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aarambh3';

const facultyHeads = [
  {
    name: "Dr. Sameer Kumar",
    role: "Faculty Head, Technical Events",
    section: "faculty",
    branch: "Computer Science & Engineering",
    imageUrl: "/uploads/faculty-tech.png",
    socialLinks: { email: "sameer.tech@gecjamui.ac.in" }
  },
  {
    name: "Prof. Kavita Sharma",
    role: "Faculty Head, Cultural Events",
    section: "faculty",
    branch: "Electronics & Communication",
    imageUrl: "/uploads/faculty-cultural.png",
    socialLinks: { email: "kavita.cultural@gecjamui.ac.in" }
  },
  {
    name: "Dr. Rajesh Singh",
    role: "Faculty Head, Sports Events",
    section: "faculty",
    branch: "Mechanical Engineering",
    imageUrl: "/uploads/faculty-sports.png",
    socialLinks: { email: "rajesh.sports@gecjamui.ac.in" }
  }
];

const organizingCommittee = [
  {
    name: "Aniket Kumar",
    role: "Lead Student Organizer",
    section: "organizing",
    branch: "CSE",
    year: "4th Year",
    imageUrl: "/uploads/organizer-aniket.png",
    socialLinks: { linkedin: "https://linkedin.com/in/aniket" }
  },
  {
    name: "Sneha Kumari",
    role: "Coordination Head",
    section: "organizing",
    branch: "ECE",
    year: "4th Year",
    imageUrl: "/uploads/organizer-sneha.png",
    socialLinks: { linkedin: "https://linkedin.com/in/sneha" }
  },
  {
    name: "Rahul Singh",
    role: "Operations Manager",
    section: "organizing",
    branch: "Mechanical",
    year: "3rd Year",
    imageUrl: "/uploads/organizer-rahul.png",
    socialLinks: { linkedin: "https://linkedin.com/in/rahul" }
  }
];

const sportsCoordinators = [
  {
    name: "Amit Kumar",
    role: "Sports Head",
    section: "sports",
    branch: "Civil",
    year: "4th Year",
    imageUrl: "/uploads/organizer-aniket.png",
    socialLinks: { instagram: "https://instagram.com/amit" }
  },
  {
    name: "Priya Kumari",
    role: "Sports Coordinator",
    section: "sports",
    branch: "ECE",
    year: "3rd Year",
    imageUrl: "/uploads/organizer-sneha.png",
    socialLinks: { instagram: "https://instagram.com/priya" }
  }
];

const seedTeam = async () => {
  try {
    console.log('Connecting to MongoDB at:', MONGO_URI);
    // Matching exact options from db.js
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000 // 5 second timeout
    });
    console.log('Connected successfully to database.');

    // Clear existing members for updated sections
    console.log('Cleaning existing members...');
    const deleteResult = await Team.deleteMany({ section: { $in: ['faculty', 'organizing', 'sports'] } });
    console.log('Cleaned members:', deleteResult.deletedCount);

    console.log('Seeding new team members...');
    const insertResult = await Team.insertMany([...facultyHeads, ...organizingCommittee, ...sportsCoordinators]);
    console.log('Inserted members:', insertResult.length);

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding failed with error:', err.message);
    if (err.reason) console.error('Reason:', err.reason);
    process.exit(1);
  }
};

seedTeam();
