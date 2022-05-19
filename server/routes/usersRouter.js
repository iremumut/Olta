import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  getUserPosts,
  updateUser,
  deleteUser,
  getAllUsers,
  getAnotherUser,
  getAnotherUserPosts,
  getLikedPosts,
  getAnotherUserLikedPosts,
  getUserComments,
  getAnotherUserComments,
  followUser,
  unfollowUser,
  getUserFollowers,
  getUserFollowed,
  getAnotherUserFollowers,
  getAnotherUserFollowed,
} from "../controllers/usersController.js";
import { protect } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/me", protect, getUser);
Router.put("/", protect, updateUser);
Router.delete("/", protect, deleteUser);
Router.get("/", protect, getAllUsers);

Router.post("/follows/:userid", protect, followUser);
Router.delete("/follows/:userid", protect, unfollowUser);

Router.get("/posts", protect, getUserPosts);
Router.get("/:userid/posts", protect, getAnotherUserPosts);

Router.get("/likedPosts", protect, getLikedPosts);
Router.get("/:userid/likedPosts", protect, getAnotherUserLikedPosts);

Router.get("/comments", protect, getUserComments);
Router.get("/:userid/comments", protect, getAnotherUserComments);

Router.get("/followers", protect, getUserFollowers);
Router.get("/followed", protect, getUserFollowed);

Router.get("/:userid/followers", protect, getAnotherUserFollowers);
Router.get("/:userid/followed", protect, getAnotherUserFollowed);

Router.get("/:userid", protect, getAnotherUser);

export default Router;
