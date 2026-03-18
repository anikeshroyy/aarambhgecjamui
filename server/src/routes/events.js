const express = require('express');
const router = express.Router();
const eventsController = require('../controllers/eventsController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', eventsController.getAllEvents);
router.get('/:id', eventsController.getEventById);

// Protected routes (Admin only)
router.post('/', verifyToken, upload.single('image'), eventsController.createEvent);
router.put('/:id', verifyToken, upload.single('image'), eventsController.updateEvent);
router.delete('/:id', verifyToken, eventsController.deleteEvent);

module.exports = router;
