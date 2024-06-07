const request = require('supertest');
const app = require('./app'); // Replace with path to your app file

describe('Blog API', () => {
  test('POST /api/blogs adds a new blog', async () => {
    const newBlog = {
      title: 'Test Blog Title',
      author: 'Test Author',
      likes: 0,
    };

    const response = await request(app)
      .post('/api/blogs')
      .send(newBlog);

    expect(response.status).toBe(201); // Check for successful creation (201)
    expect(response.body.title).toBe(newBlog.title); // Verify title
    expect(response.body.author).toBe(newBlog.author); // Verify author
    expect(response.body.likes).toBe(newBlog.likes); // Verify likes

    // Optional: Verify blog count increased
    const getAllResponse = await request(app).get('/api/blogs');
    expect(getAllResponse.body.length).toBeGreaterThan(0); // Verify blog count
  });
});
