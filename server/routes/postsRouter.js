import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  validatePostData,
  getPost,
  likePost,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", protect, validatePostData, createPost);

router.get("/:id", protect, getPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.post("/:id/likes", protect, likePost);
export default router;
