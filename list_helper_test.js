describe('favorite blog', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0
      }
    ];
  
    test('when list has only one blog, returns that', () => {
      const result = listHelper.favoriteBlog(listWithOneBlog);
      assert.strictEqual(result.title, 'Go To Statement Considered Harmful');
      assert.strictEqual(result.author, 'Edsger W. Dijkstra');
      assert.strictEqual(result.likes, 5);
    });
  
    const listWithMultipleBlogs = [
      { _id: '1', title: 'blog 1', author: 'author 1', likes: 2 },
      { _id: '2', title: 'blog 2', author: 'author 2', likes: 7 },
      { _id: '3', title: 'blog 3', author: 'author 3', likes: 3 }
    ];
  
    test('when list has multiple blogs, returns the most liked one', () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs);
      assert.strictEqual(result.title, 'blog 2');
      assert.strictEqual(result.author, 'author 2');
      assert.strictEqual(result.likes, 7);
    });
  
    test('when list is empty, returns null', () => {
      const result = listHelper.favoriteBlog([]);
      assert.strictEqual(result, null);
    });
  });
  