const jwt = require('jsonwebtoken'); // Assuming you already have this

const userExtractor = async (request, response, next) => {
  const token = request.headers.authorization; // Get token from authorization header
  if (!token) {
    return response.status(401).json({ error: 'Missing token' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    request.userId = decodedToken.userId; // Extract user ID from token
    next(); // Pass control to the next middleware or route handler
  } catch (error) {
    return response.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = userExtractor;
