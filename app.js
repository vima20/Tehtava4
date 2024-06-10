const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); // Import JWT library
const tokenExtractor = require('./middleware/tokenExtractor');
const userExtractor = require('./middleware/userExtractor');
const blogRoutes = require('./routes/blogRoutes'); 

const User = require('./models/user');
const Blog = require('./models/blog');

const app = express();
const port = process.env.PORT || 3000; // Use environment variable for port
app.use(tokenExtractor);
app.use('/blogs', blogRoutes);
app.use(userExtractor)

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name');

// Define JWT secret (replace with your secret key)
const jwtSecret = 'YOUR_JWT_SECRET';

// Middleware to verify JWT token
const verifyJWT = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1]; // Extract token from header
    const decodedToken = jwt.verify(token, jwtSecret); // Verify token
    req.userId = decodedToken.userId; // Set user ID in request context
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};

// User login endpoint
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body; // Get login credentials

    const user = await User.findOne({ username }); // Find user by username
    if (!user) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); // Compare password
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, jwtSecret);

    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to login' });
  }
});

// User creation endpoint (already implemented)
// ... (your existing user creation route handler)

// Blog creation endpoint with author information
app.post('/blogs', verifyJWT, async (req, res) => {
  try {
    const { title, content, authorId } = req.body; // Get blog data
    const author = await User.findById(authorId); // Find author by ID

    if (!author) {
      return res.status(400).json({ error: 'Invalid author ID' });
    }

    const newBlog = new Blog({
      title,
      content,
      author: author._id, // Use author's ._id as reference
    });
    await newBlog.save();

    res.status(201).json({ message: 'Blog created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create blog' });
  }
});

// Get all blogs (populate author information)
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'username name'); // Populate author details
    res.json(blogs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve blogs' });
  }
});

// Get a specific blog (populate author information)
app.get('/blogs/:id', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'username name'); // Populate author details
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve blog' });
  }
});

// User list endpoint (show user's blogs)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from user
