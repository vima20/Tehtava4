const mostLikes = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    const authorLikes = blogs.reduce((authorLikes, blog) => {
      if (!authorLikes[blog.author]) {
        authorLikes[blog.author] = blog.likes;
      } else {
        authorLikes[blog.author] += blog.likes;
      }
      return authorLikes;
    }, {});
  
    const mostLikedAuthor = Object.keys(authorLikes)
      .reduce((maxAuthor, currentAuthor) => {
        return authorLikes[maxAuthor] < authorLikes[currentAuthor]
          ? currentAuthor
          : maxAuthor;
      }, Object.keys(authorLikes)[0]);
  
    return {
      author: mostLikedAuthor,
      likes: authorLikes[mostLikedAuthor]
    };
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  };
  