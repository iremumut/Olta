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
  getBuyers,
  getCreator,
} from "../controllers/postsController.js";
import { protect } from "../middleware/authMiddleware.js";

import multer from "multer";
const upload = multer({ dest: "uploads/" });

const router = express.Router();

router.get("/", protect, getPosts);

router.post("/", protect, upload.single("file"), validatePostData, createPost);

router.get("/:id", protect, getPost);

router.put("/:id", protect, updatePost);

router.delete("/:id", protect, deletePost);

router.get("/:id/likes", protect, getLikes);

router.post("/:id/likes", protect, likePost);

router.delete("/:id/likes", protect, unlikePost);

router.get("/:id/comments", protect, getComments);

router.get("/:id/buyers", protect, getBuyers);

router.get("/:id/creator", protect, getComments);

export default router;
