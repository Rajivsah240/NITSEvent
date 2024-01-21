const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = 3001; // Choose a port for your backend

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/events', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const EventSchema = new mongoose.Schema({
  eventName: String,
  description: String,
  date: Date,
  time: Date,
  venue: String,
  imageUri: String,
});

const Event = mongoose.model('Event', EventSchema);

app.post('/api/events', async (req, res) => {
  try {
    const newEvent = new Event(req.body);
    await newEvent.save();
    res.status(201).json({ message: 'Event added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
