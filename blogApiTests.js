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

  test('POST /api/blogs adds a new blog', async () => {
    // ... (your existing test case for adding a blog)
  });

  test('POST /api/blogs adds a new blog with likes value', async () => {
    // ... (your existing test case for adding a blog with likes)
  });

  test('DELETE /api/blogs/:id deletes a blog', async () => {
    // Create a new blog and save it
    const newBlog = new Blog({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://example.com',
    });
    await newBlog.save();

    const blogId = newBlog._id; // Get the blog ID

    // Send a DELETE request to delete the blog
    const response = await request(app)
      .delete(`/api/blogs/${blogId}`)
      .send();

    expect(response.status).toBe(200); // Check for successful deletion (200)
    expect(response.body.message).toBe('Blog deleted successfully'); // Verify message

    // Verify that the blog is deleted from the database
    const deletedBlog = await Blog.findById(blogId);
    expect(deletedBlog).toBeNull(); // Verify blog is null
  });
});
