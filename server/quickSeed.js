const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

// Path to models and config
const Team = require('./src/models/Team');

const MONGO_URI = 'mongodb://127.0.0.1:27017/aarambh3';

const data = [
  {
    name: "Dr. Sameer Kumar",
    role: "Faculty Head, Technical Events",
    section: "faculty",
    branch: "Computer Science & Engineering",
    imageUrl: "/uploads/faculty-tech.png",
    order: 1
  },
  {
    name: "Prof. Kavita Sharma",
    role: "Faculty Head, Cultural Events",
    section: "faculty",
    branch: "Electronics & Communication",
    imageUrl: "/uploads/faculty-cultural.png",
    order: 2
  },
  {
    name: "Dr. Rajesh Singh",
    role: "Faculty Head, Sports Events",
    section: "faculty",
    branch: "Mechanical Engineering",
    imageUrl: "/uploads/faculty-sports.png",
    order: 3
  },
  {
    name: "Aniket Kumar",
    role: "Lead Student Organizer",
    section: "organizing",
    branch: "CSE",
    year: "4th Year",
    imageUrl: "/uploads/organizer-aniket.png",
    order: 1
  },
  {
    name: "Sneha Kumari",
    role: "Coordination Head",
    section: "organizing",
    branch: "ECE",
    year: "4th Year",
    imageUrl: "/uploads/organizer-sneha.png",
    order: 2
  }
];

async function seed() {
  try {
    console.log('Connecting...');
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 2000
    });
    console.log('Connected.');

    await Team.deleteMany({ section: { $in: ['faculty', 'organizing'] } });
    console.log('Cleaned.');

    await Team.insertMany(data);
    console.log('Inserted.');

    process.exit(0);
  } catch (err) {
    console.error('Error:', err.message);
    process.exit(1);
  }
}

seed();
