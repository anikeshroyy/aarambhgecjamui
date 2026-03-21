const express = require('express');
const router = express.Router();
const sponsorController = require('../controllers/sponsorController');
const { verifyToken, checkRole } = require('../middleware/auth');
const upload = require('../middleware/upload');

// Public route
router.get('/', sponsorController.getAllSponsors);

// Protected routes (Global Admin only for sponsors)
router.post('/', verifyToken, checkRole(['global']), upload.single('image'), sponsorController.createSponsor);
router.put('/:id', verifyToken, checkRole(['global']), upload.single('image'), sponsorController.updateSponsor);
router.delete('/:id', verifyToken, checkRole(['global']), sponsorController.deleteSponsor);

module.exports = router;
