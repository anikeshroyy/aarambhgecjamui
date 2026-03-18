const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['technical', 'cultural', 'sports', 'creative'],
    required: true,
  },
  day: {
    type: String,
    default: '1'
  },
  date: {
    type: String,
    default: '7 April 2026'
  },
  time: {
    type: String,
    default: '11:00 AM - 01:00 PM'
  },
  venue: {
    type: String,
    default: 'GEC Jamui Campus'
  },
  imageUrl: {
    type: String, 
    default: ''
  },
  googleFormUrl: {
    type: String,
    default: ''
  },
  rulebookUrl: {
    type: String,
    default: ''
  },
  rules: {
    type: [String],
    default: []
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: {
    type: [String],
    default: []
  }
}, { timestamps: true });

// Virtual to ensure compatibility with our frontend expecting 'id' instead of '_id'
eventSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Event', eventSchema);
