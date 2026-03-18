const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken } = require('../middleware/auth');

// Public route for login
router.post('/login', adminController.login);

// Protected route to verify token
router.get('/verify', verifyToken, adminController.verify);

module.exports = router;
