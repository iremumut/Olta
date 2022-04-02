import Posts from "../models/post.js";
import Users from "../models/user.js";
import asyncHandler from "express-async-handler";

// Get /posts , private
export const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await Posts.find();
  res.status(200).json(allPosts);
  //res.status(404).json({ message: error.message });
});

//POST /posts , private
export const createPost = asyncHandler(async (req, res, next) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }
  const post = await Posts.create({
    title: req.body.title,
    description: "first post text",
    contentType: "text",
    creator: req.user.id,
  });

  res.status(200).json(post);

  //console.log(req.body);
});

//PUT /posts/:id , private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);
  //console.log("post found: ", post);
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const user = await Users.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check if user is authenticated
  if (post.creator.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const updatedPost = await Posts.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedPost);
});

//DELETE /posts/:id , private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await Posts.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  const user = await Users.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //Check if user is authenticated
  if (post.creator.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();
  res.status(200).json(req.params.id);
});

export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find({ creator: req.user.id });

  res.status(200).json(posts);
});
