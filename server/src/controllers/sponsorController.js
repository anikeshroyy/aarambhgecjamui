const Sponsor = require('../models/Sponsor');
const fs = require('fs');
const path = require('path');

const getAllSponsors = async (req, res) => {
  try {
    const sponsors = await Sponsor.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    res.json(sponsors);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch sponsors' });
  }
};

const createSponsor = async (req, res) => {
  try {
    const { name, type, websiteUrl, order, isActive } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newSponsor = new Sponsor({
      name,
      type,
      imageUrl,
      websiteUrl,
      order: parseInt(order) || 0,
      isActive: isActive === 'true' || isActive === true
    });

    await newSponsor.save();
    res.status(201).json(newSponsor);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create sponsor' });
  }
};

const updateSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, type, websiteUrl, order, isActive } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (type) updateData.type = type;
    if (websiteUrl !== undefined) updateData.websiteUrl = websiteUrl;
    if (order !== undefined) updateData.order = parseInt(order);
    if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;

    if (req.file) {
      const existing = await Sponsor.findById(id);
      if (existing && existing.imageUrl) {
        const oldPath = path.join(__dirname, '..', '..', existing.imageUrl);
        if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updated = await Sponsor.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) return res.status(404).json({ error: 'Sponsor not found' });
    res.json(updated);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update sponsor' });
  }
};

const deleteSponsor = async (req, res) => {
  try {
    const { id } = req.params;
    const sponsor = await Sponsor.findById(id);
    if (!sponsor) return res.status(404).json({ error: 'Sponsor not found' });

    if (sponsor.imageUrl) {
      const imagePath = path.join(__dirname, '..', '..', sponsor.imageUrl);
      if (fs.existsSync(imagePath)) fs.unlinkSync(imagePath);
    }

    await Sponsor.findByIdAndDelete(id);
    res.json({ message: 'Sponsor deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete sponsor' });
  }
};

module.exports = {
  getAllSponsors,
  createSponsor,
  updateSponsor,
  deleteSponsor
};
