const express = require('express');
const jwt = require('jsonwebtoken'); // Assuming you already have this

const router = express.Router();

router.post('/', async (request, response) => {
  // ... (Your blog creation logic)

  const decodedToken = jwt.verify(request.token, process.env.SECRET); // Access token from middleware
  // ... (Use decodedToken for user identification or authorization)

  response.status(201).json({ message: 'Blog created successfully' });
});

module.exports = router;
