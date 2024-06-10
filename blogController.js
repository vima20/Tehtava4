const express = require('express');
const Blog = require('../models/blog');
const User = require('../models/user');
const verifyToken = require('../middleware/auth'); // Lisää tämä rivi

const router = express.Router();

// ... (Muu koodi)

// Esimerkki suojatusta reitistä
router.get('/blogs', verifyToken, async (req, res) => {
  // Hae kaikki blogit tietokannasta
  const blogs = await Blog.find();

  // Lisää blogien tekijöiden tiedot
  const blogsWithAuthors = await Promise.all(blogs.map(async (blog) => {
    const author = await User.findById(blog.author);
    return {
      ...blog._doc, // Kopioi blogiobjektin ominaisuudet
      author: {
        username: author.username,
        name: author.name,
      },
    };
  }));

  res.status(200).json(blogsWithAuthors);
});

// ... (Muu koodi)

module.exports = router;
