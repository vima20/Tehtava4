const request = require('supertest');
const app = require('./app'); // Replace with path to your app file
const mongoose = require('mongoose');

describe('Blog API', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-database'); // Replace with your DB connection string
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  // Existing test cases (replace with yours if needed)

  test('POST /api/blogs returns 400 if title is missing', async () => {
    const newBlog = {
      author: 'Test Author',
      url: 'https://example.com',
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog);

    expect(response.status).toBe(400); // Check for Bad Request (400)
    expect(response.body.error).toBe('Missing required field: title'); // Verify error message
  });

  test('POST /api/blogs returns 400 if url is missing', async () => {
    const newBlog = {
      title: 'Test Blog Title',
      author: 'Test Author',
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog);

    expect(response.status).toBe(400); // Check for Bad Request (400)
    expect(response.body.error).toBe('Missing required field: url'); // Verify error message
  });
});
