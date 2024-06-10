const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const verifyToken = require('../middleware/auth'); // Lisää tämä rivi

const router = express.Router();

// ... (Muu koodi)

// Esimerkki suojatusta reitistä
router.post('/blogs', verifyToken, async (req, res) => {
  const { title, content } = req.body; // Get blog data

  // Tarkista token ja hae käyttäjän ID
  const authorId = req.userId;
  if (!authorId) {
    return res.status(400).json({ error: 'Invalid author ID' });
  }

  const newBlog = new Blog({
    title,
    content,
    author: authorId, // Use author's ._id as reference
    createdBy: req.userId, // Get the current user ID from the request context
  });
  await newBlog.save();

  res.status(201).json({ message: 'Blog created successfully' });
});

// ... (Muu koodi)

module.exports = router;
