const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Mood = require('./moodModel');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// API routes
app.get('/api/moods', async (req, res) => {
  const moods = await Mood.find().sort({ date: -1 });
  res.json(moods);
});

// POST a new mood
app.post('/api/moods', async (req, res) => {
  const { color, note } = req.body;
  const newMood = new Mood({ color, note });
  const savedMood = await newMood.save();
  res.json(savedMood);
});

// DELETE a mood
app.delete('/api/moods/:id', async (req, res) => {
  await Mood.findByIdAndDelete(req.params.id);
  res.json({ success: true });
});

// test route
app.get('/', (req, res) => {
  res.send('MindHue server is running...');
});

const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
