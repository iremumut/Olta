import express from "express";
import { getPosts } from "../controllers/post.js";

const router = express.Router();

router.get("/", (req, res) => {
  getPosts(req, res);
});

export default router;
