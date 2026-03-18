const Gallery = require('../models/Gallery');
const fs = require('fs');
const path = require('path');

const getImages = async (req, res) => {
  try {
    const { edition, category } = req.query;
    let query = {};
    
    if (edition && edition !== 'all') query.edition = edition;
    if (category && category !== 'all') query.category = category;

    const images = await Gallery.find(query).sort({ createdAt: -1 });
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery images:', error);
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
};

const uploadImage = async (req, res) => {
  try {
    const { edition, category } = req.body;
    
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const newImage = new Gallery({
      edition: edition || '3.0',
      category: category || 'candid',
      imageUrl
    });

    await newImage.save();
    res.status(201).json(newImage);
  } catch (error) {
    console.error('Error uploading gallery image:', error);
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

const deleteImage = async (req, res) => {
  try {
    const { id } = req.params;
    
    const image = await Gallery.findById(id);
    if (!image) {
       return res.status(404).json({ error: 'Image not found' });
    }

    if (image.imageUrl) {
      const imagePath = path.join(__dirname, '..', '..', image.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Gallery.findByIdAndDelete(id);
    res.json({ message: 'Image successfully deleted' });
  } catch (error) {
    console.error('Error deleting gallery image:', error);
    res.status(500).json({ error: 'Failed to delete image' });
  }
};

module.exports = {
  getImages,
  uploadImage,
  deleteImage
};
