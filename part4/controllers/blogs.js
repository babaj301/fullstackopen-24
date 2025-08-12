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

blogRouter.delete("/:id", async (request, response, next) => {
  const id = request.params.id;
  await Blog.findByIdAndDelete(id);
  response.status(204).end();
});
blogRouter.put("/:id", async (request, response, next) => {
  const body = request.body;
  const id = request.params.id;

  const updatedBlog = await Blog.findOneAndUpdate(id, body, { new: true });
  response.status(200).json(updatedBlog);
});

module.exports = blogRouter;
