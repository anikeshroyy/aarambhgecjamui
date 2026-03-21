const mongoose = require('mongoose');

const sponsorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    enum: ['title', 'gold', 'silver', 'bronze', 'partner', 'media'],
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  websiteUrl: {
    type: String,
    trim: true
  },
  order: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Sponsor', sponsorSchema);
