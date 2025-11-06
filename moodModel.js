const mongoose = require('mongoose');

// Define the schema (structure) for each mood entry
const moodSchema = new mongoose.Schema({
  color: { type: String, required: true },
  note: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// Create-export the Mongoose model
module.exports = mongoose.model('Mood', moodSchema);
