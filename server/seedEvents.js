const mongoose = require('mongoose');
require('dotenv').config();

const Event = require('./src/models/Event');
const connectDB = require('./src/config/db');

const seedEvents = async () => {
  console.log('Starting seed script...');
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/aarambh3';
    console.log(`Connecting to: ${mongoUri}`);
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB.');
    
    // Clear existing events 
    const deleteResult = await Event.deleteMany({});
    console.log(`Cleared ${deleteResult.deletedCount} existing events.`);

    const dummyEvents = [
      {
        title: "Ideas in Motion",
        description: "Turn your ideas into reality. A technical showcase of innovation and engineering where students present their groundbreaking projects.",
        category: "technical",
        day: "1",
        date: "7 April 2026",
        time: "11:00 AM - 01:00 PM",
        venue: "Main Auditorium",
        googleFormUrl: "https://forms.google.com/dummy-tech",
        rulebookUrl: "https://example.com/tech-rulebook.pdf",
        rules: [
          "Maximum 4 members per team",
          "Working prototype is mandatory",
          "10 minutes for presentation",
          "Judging based on innovation & feasibility"
        ],
        isActive: true,
        tags: ["innovation", "tech", "projects"],
        imageUrl: "https://images.unsplash.com/photo-1540039155732-6a7144400dc2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
      },
      {
        title: "Urban Panchayat",
        description: "Debate your way to glory. A fierce cultural competition where oratory skills and logical reasoning meet to discuss social themes.",
        category: "cultural",
        day: "1",
        date: "7 April 2026",
        time: "11:00 AM - 01:00 PM",
        venue: "Open Arena",
        googleFormUrl: "https://forms.google.com/dummy-cultural",
        rulebookUrl: "https://example.com/cultural-rulebook.pdf",
        rules: [
          "Individual participation only",
          "5 minutes per speaker",
          "Language: English/Hindi",
          "No offensive language allowed"
        ],
        isActive: true,
        tags: ["debate", "culture", "voices"],
        imageUrl: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
      },
      {
        title: "Candid Picture",
        description: "Capture the unseen moments. A creative photography contest for those who see the world through a different lens.",
        category: "creative",
        day: "1",
        date: "7 April 2026",
        time: "11:00 AM - 01:00 PM",
        venue: "College Campus",
        googleFormUrl: "https://forms.google.com/dummy-creative",
        rulebookUrl: "https://example.com/creative-rulebook.pdf",
        rules: [
          "Photos must be taken on campus",
          "Post-processing is limited",
          "Submit by 5:00 PM on Day 1",
          "Original RAW files may be requested"
        ],
        isActive: true,
        tags: ["photography", "creative", "vision"],
        imageUrl: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
      },
      {
        title: "SprintX Dash",
        description: "The ultimate test of speed. Marquee track event for both men's and women's categories.",
        category: "sports",
        day: "2",
        date: "8 April 2026",
        time: "09:00 AM - 12:00 PM",
        venue: "College Ground",
        googleFormUrl: "https://forms.google.com/dummy-sports",
        rulebookUrl: "https://example.com/sports-rulebook.pdf",
        rules: [
          "Standard IAAF rules apply",
          "Heats leading to a final round",
          "Proper sports gear mandatory",
          "False starts lead to disqualification"
        ],
        isActive: true,
        tags: ["track", "sprint", "speed"],
        imageUrl: "https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&auto=format&fit=crop&w=1080&q=80"
      }
    ];

    await Event.insertMany(dummyEvents);
    console.log(`Successfully seeded ${dummyEvents.length} distinct events into MongoDB.`);
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedEvents();
