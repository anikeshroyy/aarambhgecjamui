const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  section: {
    type: String,
    enum: ['faculty', 'organizing', 'core', 'technical', 'cultural', 'hospitality', 'media', 'sports'],
    required: true
  },
  branch: {
    type: String,
    default: ''
  },
  year: {
    type: String,
    default: ''
  },
  order: {
    type: Number,
    default: 0
  },
  imageUrl: {
    type: String,
    default: ''
  },
  socialLinks: {
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    email: { type: String, default: '' }
  }
}, { timestamps: true });

// Virtual for compatibility with frontend mapping 'id'
teamSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Team', teamSchema);
