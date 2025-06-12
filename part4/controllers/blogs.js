const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response, next) => {
  const blogs = await Blog.find({});
  response.json(blogs);
});

blogRouter.post("/", async (request, response, next) => {
  const body = request.body;
  if (!body.title || !body.url) {
    return response.sendStatus(400);
  }
  const blog = new Blog(body);

  const savedBlog = await blog.save();
  response.status(201).json(savedBlog);
});

module.exports = blogRouter;
