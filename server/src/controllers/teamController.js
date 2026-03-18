const Team = require('../models/Team');
const fs = require('fs');
const path = require('path');

const getAllMembers = async (req, res) => {
  try {
    const { section } = req.query;
    let query = {};
    if (section && section !== 'all') {
      query.section = section;
    }
    const members = await Team.find(query).sort({ order: 1, name: 1 });
    res.json(members);
  } catch (error) {
    console.error('Error fetching team members:', error);
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
};

const getMemberById = async (req, res) => {
  try {
    const { id } = req.params;
    const member = await Team.findById(id);
    if (!member) {
      return res.status(404).json({ error: 'Team member not found' });
    }
    res.json(member);
  } catch (error) {
    console.error('Error fetching team member details:', error);
    res.status(500).json({ error: 'Failed to fetch team member details' });
  }
};

const createMember = async (req, res) => {
  try {
    const { name, role, section, branch, year, order, socialLinks } = req.body;
    let imageUrl = '';

    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newMember = new Team({
      name,
      role,
      section,
      branch,
      year,
      order: parseInt(order) || 0,
      socialLinks: socialLinks ? JSON.parse(socialLinks) : {},
      imageUrl
    });

    await newMember.save();
    res.status(201).json(newMember);
  } catch (error) {
    console.error('Error creating team member:', error);
    res.status(500).json({ error: 'Failed to create team member' });
  }
};

const updateMember = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, section, branch, year, order, socialLinks } = req.body;
    const updateData = {};

    if (name) updateData.name = name;
    if (role) updateData.role = role;
    if (section) updateData.section = section;
    if (branch !== undefined) updateData.branch = branch;
    if (year !== undefined) updateData.year = year;
    if (order !== undefined) updateData.order = parseInt(order);
    if (socialLinks) updateData.socialLinks = JSON.parse(socialLinks);

    if (req.file) {
      const existingMember = await Team.findById(id);
      if (existingMember && existingMember.imageUrl) {
         const oldPath = path.join(__dirname, '..', '..', existingMember.imageUrl);
         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedMember = await Team.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedMember) {
      return res.status(404).json({ error: 'Team member not found or failed to update' });
    }

    res.json(updatedMember);
  } catch (error) {
    console.error('Error updating team member:', error);
    res.status(500).json({ error: 'Failed to update team member' });
  }
};

const deleteMember = async (req, res) => {
  try {
    const { id } = req.params;
    
    const member = await Team.findById(id);
    if (!member) {
       return res.status(404).json({ error: 'Team member not found' });
    }

    if (member.imageUrl) {
      const imagePath = path.join(__dirname, '..', '..', member.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Team.findByIdAndDelete(id);
    res.json({ message: 'Team member successfully deleted' });
  } catch (error) {
    console.error('Error deleting team member:', error);
    res.status(500).json({ error: 'Failed to delete team member' });
  }
};

module.exports = {
  getAllMembers,
  getMemberById,
  createMember,
  updateMember,
  deleteMember
};
