const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    const authorCounts = blogs.reduce((authorCounts, blog) => {
      if (!authorCounts[blog.author]) {
        authorCounts[blog.author] = 1;
      } else {
        authorCounts[blog.author]++;
      }
      return authorCounts;
    }, {});
  
    const mostProlificAuthor = Object.keys(authorCounts)
      .reduce((maxAuthor, currentAuthor) => {
        return authorCounts[maxAuthor] < authorCounts[currentAuthor]
          ? currentAuthor
          : maxAuthor;
      }, Object.keys(authorCounts)[0]);
  
    return {
      author: mostProlificAuthor,
      blogs: authorCounts[mostProlificAuthor]
    };
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs
  };
  