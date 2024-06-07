const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); // Import bcrypt for password hashing

const app = express();

// Connect to MongoDB database (replace with your connection string)
mongoose.connect('mongodb://localhost:27017/your-database-name');

// Define User Schema with username, hashed password, and name
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
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
    const { username, password, name } = req.body; // Get user data from request

    // Check for required fields
    if (!username || !password || !name) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user and save
    const newUser = new User({
      username,
      password: hashedPassword,
      name,
    });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// GET route handler for listing users
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find(); // Get all users
    res.json(users.map(user => ({ // Return users without password
      _id: user._id,
      username: user.username,
      name: user.name,
    })));
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to get users' });
  }
});

// Start the server (add your port number)
app.listen(3000, () => console.log('Server listening on port 3000'));
