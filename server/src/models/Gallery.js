const mongoose = require('mongoose');

const gallerySchema = new mongoose.Schema({
  edition: {
    type: String,
    required: true,
    enum: ['3.0', '2.0', '1.0']
  },
  category: {
    type: String,
    required: true,
    enum: ['technical', 'cultural', 'candid', 'stage']
  },
  imageUrl: {
    type: String,
    required: true
  }
}, { timestamps: true });

gallerySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, ret) => {
    delete ret._id;
  }
});

module.exports = mongoose.model('Gallery', gallerySchema);
