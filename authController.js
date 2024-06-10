const express = require('express');
const bcrypt = require('bcrypt'); // Salasana hashaukseen
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const router = express.Router();

// Rekisteröitymisreitti
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Tarkista, onko käyttäjänimi jo olemassa
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    return res.status(400).json({ error: 'Käyttäjänimi on jo olemassa' });
  }

  // Salasana hash auksesta
  const saltRounds = 10;
  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Luo uusi käyttäjä
  const newUser = new User({
    username,
    password: hashedPassword,
  });
  await newUser.save();

  // Luo JWT-token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET);

  res.status(201).json({ token });
});

// Kirjautumisreitti
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // Hae käyttäjä tietokannasta
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json({ error: 'Väärä käyttäjänimi tai salasana' });
  }

  // Tarkista salasana
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return res.status(401).json({ error: 'Väärä käyttäjänimi tai salasana' });
  }

  // Luo JWT-token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

  res.status(200).json({ token });
});

module.exports = router;
