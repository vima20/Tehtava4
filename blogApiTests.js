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

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/required/); // Check for required field error
  });

  test('POST /api/users fails with invalid username length', async () => {
    const invalidUser = {
      username: 'ab', // Username too short
      password: 'password123',
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/username must be at least 3/);
  });

  test('POST /api/users fails with invalid username characters', async () => {
    const invalidUser = {
      username: 'test#user', // Username with special character
      password: 'password123',
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/failed/); // Mongoose validation error
  });

  test('POST /api/users fails with invalid password length', async () => {
    const invalidUser = {
      username: 'testuser',
      password: 'pass', // Password too short
      name: 'Test User',
    };

    const response = await request(app)
      .post('/api/users')
      .send(invalidUser);

    expect(response.status).toBe(400);
    expect(response.body.error).toMatch(/password must be at least 6/);
  });
});
