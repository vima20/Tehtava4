const request = require('supertest');
const app = require('./app'); // Replace with path to your app file
const mongoose = require('mongoose');

describe('User API', () => {
  beforeEach(async () => {
    await mongoose.connect('mongodb://localhost:27017/test-database'); // Replace with your DB connection string
  });

  afterEach(async () => {
    await mongoose.connection.dropDatabase();
    await mongoose.disconnect();
  });

  // Existing test cases (replace with yours if needed)

  test('POST /api/users creates a new user', async () => {
    const newUser = {
      username: 'testuser',
      password: 'password123',
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(newUser);

    expect(response.status).toBe(201); // Check for successful creation (201)
    expect(response.body.message).toBe('User created successfully');
  });

  test('POST /api/users fails with missing fields', async () => {
    const invalidUser = {
      username: 'testuser',
    };

    const response = await request(app)
      .post('/api/users')
      .send(invalidUser);

    expect(response.status).toBe(400); // Check for bad request (400)
    expect(response.body.error).toBe('Missing required fields');
  });

  test('GET /api/users lists all users', async () => {
    // Create some users first (replace with your user creation logic)
    const user1 = await new User({
      username: 'user1',
      password: 'password1',
      name: 'User One',
    }).save();

    const user2 = await new User({
      username: 'user2',
      password: 'password2',
      name: 'User Two',
    }).save();

    const response = await request(app)
      .get('/api/users');

    expect(response.status).toBe(200); // Check for successful response (200)
    expect(response.body.length).toBe(2); // Verify two users returned
    expect(response.body[0]).not.toHaveProperty('password'); // Ensure password is not sent
  });
});
