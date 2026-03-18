require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');

// Connect Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static uploaded files locally
// This maps requests like http://localhost:5000/uploads/image.jpg to the physical uploads folder
app.use('/uploads', express.static(path.join(__dirname, '..', 'uploads')));

// Routes
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));
app.use('/api/team', require('./routes/team'));
app.use('/api/gallery', require('./routes/gallery'));

// Basic health check
app.get('/', (req, res) => {
  res.send('Aarambh 3.0 API is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong on the server!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
