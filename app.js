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

// DELETE route handler for deleting a blog (replace with your existing handler)
// ... (your existing DELETE route handler for deleting a blog)

// PUT route handler for updating a blog
app.put('/api/blogs/:id', async (req, res) => {
  try {
    const blogId = req.params.id; // Get blog ID from URL parameter
    const updatedBlog = req.body; // Get updated blog data from request body

    // Find the blog to update
    const blogToUpdate = await Blog.findByIdAndUpdate(
      blogId,
      updatedBlog,
      { new: true } // Return the updated document
    );

    if (!blogToUpdate) {
      // Blog not found
      res.status(404).json({ error: 'Blog not found' });
      return;
    }

    res.status(200).json(blogToUpdate); // Send the updated blog
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update blog' });
  }
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
