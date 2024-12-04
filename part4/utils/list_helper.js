const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  if (blogs.length === 0) {
    return 0;
  }
  let total = 0;
  blogs.map((blog) => (total += blog.likes));
  return total;
};

const favoriteBlog = (blogs) => {
  const allLikes = blogs.map((blog) => blog.likes);
  const mostLikes = Math.max(...allLikes);
  return blogs.find((blog) => blog.likes === mostLikes);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
