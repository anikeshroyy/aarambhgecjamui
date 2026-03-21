const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');
const { verifyToken, checkRole } = require('../middleware/auth');

// Public route for login
router.post('/login', adminController.login);

// Protected routes
router.get('/verify', verifyToken, adminController.verify);

// Admin management (Global Only)
router.get('/list', verifyToken, checkRole(['global']), adminController.getAdmins);
router.post('/create', verifyToken, checkRole(['global']), adminController.createAdmin);
router.delete('/:id', verifyToken, checkRole(['global']), adminController.deleteAdmin);

module.exports = router;
