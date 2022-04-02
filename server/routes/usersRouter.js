import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
  getUserPosts,
} from "../controllers/usersController.js";
import { protect } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/me", protect, getUser);
Router.get("/posts", protect, getUserPosts);

export default Router;
