import PostModel from "../models/post.js";
import asyncHandler from "express-async-handler";

// Get /posts , private
export const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await PostModel.find();
  res.status(200).json(allPosts);
  //res.status(404).json({ message: error.message });
});

//POST /post , private
export const createPost = asyncHandler(async (req, res, next) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }
  const post = await PostModel.create({
    title: req.body.title,
    description: "first post text",
    contentType: "text",
  });

  res.status(200).json(post);

  //console.log(req.body);
});

//PUT /posts/:id , private
export const updatePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  const updatedPost = await PostModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.status(200).json(updatedPost);
});

//DELETE /posts/:id , private
export const deletePost = asyncHandler(async (req, res) => {
  const post = await PostModel.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  await post.remove();
  res.status(200).json(req.params.id);
});
