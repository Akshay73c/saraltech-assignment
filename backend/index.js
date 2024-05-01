const express = require("express");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const prisma = new PrismaClient();
const app = express();

app.use(express.json());
app.use(cors());

app.post(`/signup`, async (req, res) => {
  const { name, email, password } = req.body;
  //dB query to prisma
  const result = await prisma.user.create({
    data: {
      name,
      email,
      password,
    },
  });

  res.json({ result: result, message: "Yep done" });
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json(users);
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || password !== user.password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log(user);
    res.json({ user: user, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error during login" });
  }
});

app.get(`/user/:Id/posts`, async (req, res) => {
  const { Id } = req.params;
  const authourId = parseInt(Id);

  const posts = await prisma.post.findMany({
    where: { authourId },
  });

  res.json({ posts: posts, message: "Yep got it" });
});

app.post(`/user/:userId/post`, async (req, res) => {
  console.log("Got create post req");
  const { title, content, authourEmail } = req.body;

  const result = await prisma.post.create({
    data: {
      title,
      content,
      authour: { connect: { email: authourEmail } },
    },
  });
  res.json({ result: result, message: "Yep done" });
});

app.get(`/post/:id`, async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findUnique({
    where: { id: Number(id) },
  });
  res.json({ post: post, message: "Yep done" });
});

app.put("/post/:id/views", async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        viewCount: {
          increment: 1,
        },
      },
    });

    res.json({ post: post, message: "Yep done" });
  } catch (error) {
    res.json({ error: `Post with ID ${id} does not exist in the database` });
  }
});

app.delete(`/post/:id`, async (req, res) => {
  const { id } = req.params;
  const post = await prisma.post.delete({
    where: {
      id: Number(id),
    },
  });
  res.json({ post: post, message: "Yep done" });
});

app.listen(3000, () => {
  console.log("Server started at PORT 3000");
});
