const tokenExtractor = (request, response, next) => {
    const authorizationHeader = request.headers['authorization'];
  
    if (!authorizationHeader) {
      return response.status(401).json({ error: 'Missing authorization header' });
    }
  
    const [bearer, token] = authorizationHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      return response.status(401).json({ error: 'Invalid authorization header' });
    }
  
    request.token = token;
    next();
  };
  
  module.exports = tokenExtractor;
  