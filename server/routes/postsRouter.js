import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getUserPosts,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", protect, createPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.get("/user", protect, getUserPosts);
export default router;
