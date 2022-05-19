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
} from "../controllers/usersController.js";
import { protect } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/me", protect, getUser);
Router.put("/", protect, updateUser);
Router.delete("/", protect, deleteUser);
Router.get("/", protect, getAllUsers);

Router.get("/posts", protect, getUserPosts);
Router.get("/:userid/posts", protect, getAnotherUserPosts);

Router.get("/likedPosts", protect, getLikedPosts);
Router.get("/:userid/likedPosts", protect, getAnotherUserLikedPosts);

Router.get("/comments", protect, getUserComments);
Router.get("/:userid/comments", protect, getAnotherUserComments);

Router.get("/:userid", protect, getAnotherUser);

export default Router;
