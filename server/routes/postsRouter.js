import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  validatePostData,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getPosts);

router.post("/", protect, validatePostData, createPost);

router.put("/:id", protect, validatePostData, updatePost);

router.delete("/:id", protect, deletePost);
export default router;
