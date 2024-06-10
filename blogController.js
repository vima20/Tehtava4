const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');

// ... (Other code)

async function createBlog(req, res) {
  const { title, content, authorId } = req.body; // Get blog data
  const author = await User.findById(authorId); // Find author by ID

  if (!author) {
    return res.status(400).json({ error: 'Invalid author ID' });
  }

  const newBlog = new Blog({
    title,
    content,
    author: author._id, // Use author's ._id as reference
    createdBy: req.userId, // Get the current user ID from the request context
  });
  await newBlog.save();

  res.status(201).json({ message: 'Blog created successfully' });
}

// ... (Other code)

module.exports = {
  // ... (Other functions)
  createBlog,
};
