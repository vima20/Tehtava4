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

  test('POST /api/blogs adds a new blog', async () => {
    const newBlog = {
      title: 'Test Blog Title',
      author: 'Test Author',
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog);

    expect(response.status).toBe(201); // Check for successful creation (201)
    expect(response.body.title).toBe(newBlog.title); // Verify title
    expect(response.body.author).toBe(newBlog.author); // Verify author
    expect(response.body.likes).toBe(0); // Verify likes default to 0
  });

  test('POST /api/blogs adds a new blog with likes value', async () => {
    const newBlog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      likes: 5,
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog);

    expect(response.status).toBe(201); // Check for successful creation (201)
    expect(response.body.title).toBe(newBlog.title); // Verify title
    expect(response.body.author).toBe(newBlog.author); // Verify author
    expect(response.body.likes).toBe(newBlog.likes); // Verify likes value
  });
});
