import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";
import { protect } from "../middleware/authMiddleware.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/me", protect, getUser);

export default Router;
