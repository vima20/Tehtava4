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
    // ... (your existing test case for deleting a blog)
  });

  test('PUT /api/blogs/:id updates a blog', async () => {
    // Create a new blog and save it
    const newBlog = new Blog({
      title: 'Test Blog Title',
      author: 'Test Author',
      url: 'https://example.com',
    });
    await newBlog.save();

    const blogId = newBlog._id; // Get the blog ID

    // Prepare updated blog data
    const updatedBlog = {
      likes: 100, // Update likes to 100
    };

    // Send a PUT request to update the blog
    const response = await request(app)
      .put(`/api/blogs/${blogId}`)
      .send(updatedBlog);

    expect(response.status).toBe(200); // Check for successful update (200)
    expect(response.body.likes).toBe(100); // Verify likes are updated

    // Verify the blog is updated in the database
    const updatedBlogFromDB = await Blog.findById(blogId);
    expect(updatedBlogFromDB.likes).toBe(100); // Verify likes in DB
  });
});
