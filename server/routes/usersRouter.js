import express from "express";
import {
  getUser,
  loginUser,
  registerUser,
} from "../controllers/usersController.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/login", loginUser);
Router.get("/me", getUser);

export default Router;
