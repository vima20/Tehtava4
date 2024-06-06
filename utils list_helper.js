const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    const mostLikedBlog = blogs.reduce((maxLiked, currentBlog) => {
      return currentBlog.likes > maxLiked.likes ? currentBlog : maxLiked;
    }, blogs[0]);
  
    return mostLikedBlog;
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
  };
  