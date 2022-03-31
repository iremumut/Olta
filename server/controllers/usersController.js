import UserModel from "../models/user.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

//POST /users , public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    res.status(404);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const userExistsByEmail = await UserModel.findOne({ email: email });
  const userExistsByUsername = await UserModel.findOne({ userName: username });

  if (userExistsByEmail || userExistsByUsername) {
    res.status(400);
    throw new Error("User already exists.");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await UserModel.create({
    name: name,
    email: email,
    userName: username,
    password: hashedPassword,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User is not created");
  }
});

//POST /users/login , public
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //Check for user email
  const user = await UserModel.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//GET /users/me , private
export const getUser = asyncHandler(async (req, res) => {
  const { _id, name, userName, email } = await UserModel.findById(req.user.id);
  res.status(200).json({
    id: _id,
    email,
    name,
    username: userName,
  });
});

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
