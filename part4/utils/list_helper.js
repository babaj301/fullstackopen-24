const dummy = (blogs) => {
  return 1;
};

const blogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0,
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0,
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0,
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0,
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0,
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0,
  },
];

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

const mostBlogs = (blogs) => {
  const authors = blogs.map((blog) => {
    return blog.author;
  });
  const authorAndBlogs = {};
  const uniqueAuthorsSet = new Set(authors);
  const uniqueAuthors = [...uniqueAuthorsSet];

  const result = uniqueAuthors.map((author, index) => {
    const value = authors.filter((author) => author === uniqueAuthors[index]);
    return {
      author,
      blogs: value.length,
    };
  });

  const maxBlogs = Math.max(...result.map((blog) => blog.blogs));
  return result.filter((blog) => blog.blogs === maxBlogs);
};

const mostLikes = (blogs) => {
  const authors = blogs.map((blog) => {
    return blog.author;
  });
  const uniqueAuthorsSet = new Set(authors);
  const uniqueAuthors = [...uniqueAuthorsSet];
  const likes = blogs.map((blogs) => {
    return blogs.likes;
  });

  console.log(likes);
  const maxLike = Math.max(...likes);

  const result = blogs.find((blog) => {
    return blog.likes === maxLike;
  });

  const resultAuth = result.author;

  const arrOfAuthBlogs = blogs.filter((blog) => {
    return blog.author === resultAuth;
  });
  const likesSum = arrOfAuthBlogs.reduce(
    (acc, blogLike) => acc + blogLike.likes,
    0
  );

  return {
    author: resultAuth,
    likes: likesSum,
  };
};
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
};
