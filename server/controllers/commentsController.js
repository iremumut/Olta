import Users from "../models/user.js";
import Posts from "../models/post.js";
import Comments from "../models/comment.js";
import asyncHandler from "express-async-handler";
import {
  validateObjectID,
  checkPostFound,
  checkUserFound,
  checkCommentFound,
} from "./errorHandling.js";

//GET /comments/:commentid , private,  get a single comment
export const getComment = asyncHandler(async (req, res) => {
  const { commentid } = req.params;
  validateObjectID(res, commentid);

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const comment = await Comments.findById(commentid);
  checkCommentFound(res, comment); //check if comment is found

  res.status(200).json(comment);
});

//POST /comments/:postid , private,  create a comment
export const createComment = asyncHandler(async (req, res) => {
  const { text } = req.body;
  if (!text) {
    res.status(404);
    throw new Error("Please enter the text.");
  }

  const { postid } = req.params;
  validateObjectID(res, postid); //check if its a valid id

  const post = await Posts.findById(postid);
  checkPostFound(res, post); //check if post is found

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); // check if user exists

  const comment = await Comments.create({
    postID: post._id,
    userID: user._id,
    text: text,
  });

  post.comments.push(comment._id);
  await post.save();

  user.comments.push(comment._id);
  await user.save();

  res.status(200).json(comment);
});

//PUT /comments/:commentid , private , update comment
export const updateComment = asyncHandler(async (req, res) => {
  const { commentid } = req.params;
  validateObjectID(res, commentid);

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const comment = await Comments.findById(commentid);
  checkCommentFound(res, comment); //check if comment is found

  if (comment.userID.toString() !== user._id.toString()) {
    res.status(404);
    throw new Error("Not authorized, doesnt own the comment");
  }

  const { text } = req.body;
  if (!text) {
    res.status(404);
    throw new Error("Please enter the text.");
  }

  const updatedComment = await Comments.findByIdAndUpdate(
    commentid,
    { text: text, edited: true },
    {
      new: true,
    }
  );

  res.status(200).json(updatedComment);
});

//DELETE /comments/:commentid , private,  delete comment
export const deleteComment = asyncHandler(async (req, res) => {
  const { commentid } = req.params;
  validateObjectID(res, commentid);

  const comment = await Comments.findById(commentid);
  checkCommentFound(res, comment);

  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  if (comment.userID.toString() !== user._id.toString()) {
    res.status(404);
    throw new Error("Not authorized, doesnt own the comment");
  }

  const post = await Posts.findById(comment.postID);
  checkPostFound(res, post);

  user.comments.remove(comment._id);
  await user.save();
  post.comments.remove(comment._id);
  await post.save();

  await comment.remove();

  res.status(200).json(comment._id);
});
