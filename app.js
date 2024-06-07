const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name');

// Define blog schema with default likes value
const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const Blog = mongoose.model('Blog', blogSchema);

// POST route handler for adding blogs
app.post('/api/blogs', async (req, res) => {
  const newBlog = new Blog({
    title: req.body.title,
    author: req.body.author,
  });

  try {
    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
