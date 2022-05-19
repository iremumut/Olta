import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createComment,
  getComment,
  deleteComment,
  updateComment,
} from "../controllers/commentsController.js";

const router = express.Router();

router.get("/:commentid", protect, getComment);

router.post("/:postid", protect, createComment);

router.put("/:commentid", protect, updateComment);

router.delete("/:commentid", protect, deleteComment);

export default router;
