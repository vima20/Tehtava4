const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name');

// Define User Schema with username, hashed password, and name
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 20,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  name: {
    type: String,
    required: true,
  },
});

// Hash password before saving a new user
userSchema.pre('save', async function (next) {
  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  next();
});

const User = mongoose.model('User', userSchema);

// POST route handler for creating users
app.post('/api/users', async (req, res) => {
  try {
    const { username, password, name } = req.body; // Get user data

    // Check for required fields (already done in schema validation)

    // Check if username already exists (already done in schema validation)

    // Check password length (not done in schema validation)
    if (password.length < 6) {
      return res.status(400).json({ error: 'Password must be at least 6 characters long' });
    }

    // Hash password (already done in schema pre-save hook)

    // Create new user and save
    const newUser = new User({
      username,
      password, // Hashed password
      name,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    if (error.name === 'ValidationError') { // Handle validation errors
      res.status(400).json({ error: error.message });
    } else {
      res.status(500).json({ error: 'Failed to create user' });
    }
  }
});

// GET route handler for listing users (already implemented)
// ... (your existing GET /api/users route handler)

// Start the server (add your port number)
app.listen(3000, () => console.log('Server listening on port 3000'));
