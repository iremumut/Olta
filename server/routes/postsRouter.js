import express from "express";
import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  validatePostData,
  getPost,
  likePost,
  unlikePost,
  getLikes,
  getComments,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, getPosts);

router.post("/", protect, validatePostData, createPost);

router.get("/:id", protect, getPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.get("/:id/likes", protect, getLikes);

router.post("/:id/likes", protect, likePost);

router.delete("/:id/likes", protect, unlikePost);

router.get("/:id/comments", protect, getComments);

export default router;
