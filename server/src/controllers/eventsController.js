const Event = require('../models/Event');
const fs = require('fs');
const path = require('path');

const getAllEvents = async (req, res) => {
  try {
    const { category } = req.query;
    let query = {};
    if (category && category !== 'all') {
      query.category = category;
    }
    const events = await Event.find(query).sort({ createdAt: -1 });
    res.json(events);
  } catch (error) {
    console.error('Error fetching events:', error);
    res.status(500).json({ error: 'Failed to fetch events' });
  }
};

const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findById(id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Error fetching event details:', error);
    res.status(500).json({ error: 'Failed to fetch event details' });
  }
};

const createEvent = async (req, res) => {
  try {
    const { title, description, category, googleFormUrl, isActive, tags } = req.body;
    let imageUrl = '';

    if (req.file) {
      // Store relative path. The frontend will prepend the backend URL.
      imageUrl = `/uploads/${req.file.filename}`;
    }

    const newEvent = new Event({
      title,
      description,
      category,
      googleFormUrl,
      isActive: isActive === 'true' || isActive === true,
      tags: tags ? JSON.parse(tags) : [],
      imageUrl
    });

    await newEvent.save();
    res.status(201).json(newEvent);
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
};

const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, googleFormUrl, isActive, tags } = req.body;
    const updateData = {};

    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (googleFormUrl !== undefined) updateData.googleFormUrl = googleFormUrl;
    if (isActive !== undefined) updateData.isActive = isActive === 'true' || isActive === true;
    if (tags) updateData.tags = JSON.parse(tags);

    if (req.file) {
      // If a new image is uploaded, we should ideally delete the old one from the disk
      const existingEvent = await Event.findById(id);
      if (existingEvent && existingEvent.imageUrl) {
         const oldPath = path.join(__dirname, '..', '..', existingEvent.imageUrl);
         if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
      }
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }

    const updatedEvent = await Event.findByIdAndUpdate(id, updateData, { new: true });
    
    if (!updatedEvent) {
      return res.status(404).json({ error: 'Event not found or failed to update' });
    }

    res.json(updatedEvent);
  } catch (error) {
    console.error('Error updating event:', error);
    res.status(500).json({ error: 'Failed to update event' });
  }
};

const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;
    
    const event = await Event.findById(id);
    if (!event) {
       return res.status(404).json({ error: 'Event not found' });
    }

    // Delete image from disk if it exists
    if (event.imageUrl) {
      const imagePath = path.join(__dirname, '..', '..', event.imageUrl);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    await Event.findByIdAndDelete(id);
    res.json({ message: 'Event successfully deleted' });
  } catch (error) {
    console.error('Error deleting event:', error);
    res.status(500).json({ error: 'Failed to delete event' });
  }
};

module.exports = {
  getAllEvents,
  getEventById,
  createEvent,
  updateEvent,
  deleteEvent
};
