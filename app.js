const express = require('express');
const mongoose = require('mongoose');

const app = express();

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name');

// Define blog schema with required title and url fields
const blogSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, // Unique identifier
  title: { type: String, required: true },
  author: { type: String, required: true },
  url: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

const Blog = mongoose.model('Blog', blogSchema);

// POST route handler for adding blogs (replace with your existing handler)
// ... (your existing POST route handler for adding blogs)

// DELETE route handler for deleting a blog
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id; // Get blog ID from URL parameter
    const deletedBlog = await Blog.findByIdAndDelete(blogId); // Find and delete blog
    if (!deletedBlog) {
      // Blog not found
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    res.status(200).json({ message: 'Blog deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete blog' });
  }
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
