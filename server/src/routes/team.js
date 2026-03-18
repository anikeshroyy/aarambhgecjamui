const express = require('express');
const router = express.Router();
const teamController = require('../controllers/teamController');
const { verifyToken } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public routes
router.get('/', teamController.getAllMembers);
router.get('/:id', teamController.getMemberById);

// Protected routes (Admin only)
router.post('/', verifyToken, upload.single('image'), teamController.createMember);
router.put('/:id', verifyToken, upload.single('image'), teamController.updateMember);
router.delete('/:id', verifyToken, teamController.deleteMember);

module.exports = router;
