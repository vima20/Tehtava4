test('GET /api/blogs returns the correct number of blogs', async () => {
    const response = await request(app).get('/api/blogs');
  
    if (response.status !== 200) {
      throw new Error('Unexpected status code');
    }
  
    expect(response.body.length).toBeGreaterThan(0);
  });
  