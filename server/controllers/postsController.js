import Posts from "../models/post.js";
import Users from "../models/user.js";
import asyncHandler from "express-async-handler";
import { contentTypes } from "../constants.js";
import mongoose from "mongoose";

// GET /posts , private, get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //Check if user exists

  const allPosts = await Posts.find();
  if (!allPosts) {
    res.status(404);
    throw new Error("Resource could not be found");
  }
  res.status(200).json(allPosts);
});

//GET /posts/:id , private, get single post
export const getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateObjectID(res, id); //check if params id is valid

  const post = await Posts.findById(id);
  checkPostFound(res, post); //check if the post is found

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //Check if user exists

  res.status(200);
  res.json(post);
});

//POST /posts , private, create a new post
export const createPost = asyncHandler(async (req, res) => {
  const { title, description, tags, price, contentType, filepath, isFree } =
    req.body;

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //Check if user exists

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

//PUT /posts/:id , private , update a post
export const updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateObjectID(res, id); //check if params id is valid

  const post = await Posts.findById(id);
  checkPostFound(res, post); //check if the post is found

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //Check if user exists

  //Check if user is authenticated
  if (post.creator.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  const { price, title } = req.body;

  if (typeof title !== "undefined" && title.length === 0) {
    res.status(404);
    throw new Error("Title can't be empty.");
  }

  if (price && (isNaN(price) || price < 0)) {
    res.status(400);
    throw new Error("Please enter a valid number for price.");
  }

  if (!price || price === 0) {
    req.body.isFree = true;
  } else {
    req.body.isFree = false;
  }

  req.body = {
    ...req.body,
    _id: post._id,
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

//DELETE /posts/:id , private , delete a post
export const deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateObjectID(res, id); //check if params id is valid

  const post = await Posts.findById(id);
  checkPostFound(res, post); //check if the post is found

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //Check if user exists

  //Check if user is authenticated
  if (post.creator.toString() !== user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  await post.remove();
  res.status(200).json(req.params.id);
});

//POST /posts/:id/likes , private , like a post
export const likePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  validateObjectID(res, id); //check if params id is valid

  const post = await Posts.findById(id);
  checkPostFound(res, post); //check if the post is found

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //Check if user exists

  if (
    user._id.toString() !== post.creator.toString() &&
    !post.likes.includes(user._id)
  ) {
    post.likes.push(user._id);
    await post.save();
    const updatedPost = await Posts.findByIdAndUpdate(
      req.params.id,
      {
        likeCount: post.likeCount + 1,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedPost);
  } else {
    res.status(404);
    throw new Error(
      "Users cannot like their own post or like the same post twice"
    );
  }
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
    req.body.isFree = true;
  } else {
    req.body.isFree = false;
  }

  next();
};

const validateObjectID = (res, id) => {
  if (!mongoose.isValidObjectId(id)) {
    res.status(400);
    throw new Error("Invalid obejctId.");
  }
};

const checkPostFound = (res, post) => {
  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }
};

const checkUserFound = (res, user) => {
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }
};
