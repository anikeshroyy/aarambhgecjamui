const express = require('express');
const router = express.Router();
const galleryController = require('../controllers/galleryController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', galleryController.getImages);

// Protected routes (Admin only)
router.post('/', verifyToken, upload.single('image'), galleryController.uploadImage);
router.delete('/:id', verifyToken, galleryController.deleteImage);

module.exports = router;
