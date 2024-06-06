const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('total likes', () => {
  // Test case 1: Empty blog list
  const emptyList = []
  test('when list is empty, returns 0', () => {
    const result = listHelper.totalLikes(emptyList)
    assert.strictEqual(result, 0)
  })

  // Test case 2: List with one blog
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_ considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]

  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    assert.strictEqual(result, 5)
  })

  // Test case 3: List with multiple blogs
  const listWithMultipleBlogs = [
    { _id: '1', title: 'blog 1', author: 'author 1', likes: 2 },
    { _id: '2', title: 'blog 2', author: 'author 2', likes: 7 },
    { _id: '3', title: 'blog 3', author: 'author 3', likes: 3 }
  ]

  test('when list has multiple blogs, returns the sum of their likes', () => {
    const result = listHelper.totalLikes(listWithMultipleBlogs)
    assert.strictEqual(result, 12)
  })

  // Test case 4: List with blogs having some likes as 0
  const listWithMixedLikes = [
    { _id: '1', title: 'blog 1', author: 'author 1', likes: 0 },
    { _id: '2', title: 'blog 2', author: 'author 2', likes: 5 },
    { _id: '3', title: 'blog 3', author: 'author 3', likes: 8 }
  ]

  test('when list has some blogs with 0 likes, returns the sum excluding 0s', () => {
    const result = listHelper.totalLikes(listWithMixedLikes)
    assert.strictEqual(result, 13)
  })
})
