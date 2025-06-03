const { test, after, beforeEach } = require("node:test");
const mongoose = require("mongoose");
const supertest = require("supertest");
const assert = require("assert");
const app = require("../app");

const api = supertest(app);
const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf",
    likes: 5,
  },
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },

  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
];

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(initialBlogs);
});

test("blogs are returned as json", async () => {
  const result = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("blog has id", async () => {
  const result = await api.get("/api/blogs");
  const blogs = result.body;
  assert.strictEqual(blogs[0].hasOwnProperty("id"), true);
});

test("creates new blog post", async () => {
  const newBlog = {
    title: " Just testing",
    author: " Babajide Oluwaferanmi",
    url: " fakesitethatleadsnowhere.com",
    likes: 69,
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await api.get("/api/blogs");
  const allBlogs = result.body;

  assert.strictEqual(allBlogs.length, 4);
});

test("post without likes defaults to 0", async () => {
  const newBlog = {
    title: "Just testing",
    author: "Babajide Oluwaferanmi",
    url: "fakesitethatleadsnowhere.com",
  };
  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const result = await api.get("/api/blogs");
  const allBlogs = result.body;

  assert.strictEqual(allBlogs[3].likes, 0);
});

after(async () => {
  await mongoose.connection.close();
});
