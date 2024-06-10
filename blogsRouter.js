const express = require('express');
const jwt = require('jsonwebtoken'); // Assuming you already have this

const router = express.Router();

router.delete('/:id', async (request, response) => {
  const { id } = request.params; // Get the blog ID from the URL parameter
  const userId = request.userId; // Get the user ID from the token

  // Fetch the blog from the database
  const blog = await Blog.findById(id);
  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' });
  }

  // Check if the user is authorized to delete the blog
  if (blog.createdBy.toString() !== userId.toString()) {
    return response.status(403).json({ error: 'Unauthorized to delete blog' });
  }

  // Delete the blog
  await blog.delete();

  response.status(200).json({ message: 'Blog deleted successfully' });
});

module.exports = router;
