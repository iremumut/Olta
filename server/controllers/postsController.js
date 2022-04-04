import Posts from "../models/post.js";
import Users from "../models/user.js";
import asyncHandler from "express-async-handler";
import { contentTypes } from "../constants.js";
import mongoose from "mongoose";

// GET /posts , private, get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const allPosts = await Posts.find();
  if (!allPosts) {
    res.status(404);
    throw new Error("Resource could not be found");
  }
  res.status(200).json(allPosts);
});

//POST /posts , private, create a new post
export const createPost = asyncHandler(async (req, res) => {
  const { title, description, tags, price, contentType, filepath } = req.body;

  const user = await Users.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  const post = await Posts.create({
    title: title,
    description: description,
    contentType: contentType,
    tags: tags ? [...tags] : [],
    price: price ? price : 0,
    isFree: typeof isFree !== "undefined" ? isFree : true,
    creator: user._id,
    contentURL: filepath,
  });

  res.status(200).json(post);
});

//PUT /posts/:id , private
export const updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid obejctId.");
  }
  const post = await Posts.findById(id);

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

  req.body = {
    ...req.body,
    creator: post.creator,
    contentType: post.contentType,
    likeCount: post.likeCount,
    commentCount: post.commentCount,
    contentURL: post.contentURL,
    comments: post.comments,
    likes: post.likes,
    buyers: post.buyers,
    scores: post.scores,
    createdAt: post.createdAt,
    updatedAt: post.updatedAt,
  };

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

export const validatePostData = (req, res, next) => {
  const { title, price, contentType } = req.body;

  if (!title || !contentType || !contentTypes.includes(contentType)) {
    res.status(400);
    throw new Error("Please add requested fields accordingly.");
  }

  if (price && (isNaN(price) || price < 0)) {
    res.status(400);
    throw new Error("Please enter a valid number for price.");
  }

  if (!price || price === 0) {
    req.isFree = true;
  }
  next();
};
