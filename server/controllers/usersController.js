import Users from "../models/user.js";
import Posts from "../models/post.js";
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
  const userExistsByEmail = await Users.findOne({ email: email });
  const userExistsByUsername = await Users.findOne({ userName: username });

  if (userExistsByEmail || userExistsByUsername) {
    res.status(400);
    throw new Error("User already exists.");
  }

  //Hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  //Create user
  const user = await Users.create({
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
  const user = await Users.findOne({ email: email });

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
  const { _id, name, userName, email } = await Users.findById(req.user.id);
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

//GET /users/posts , private , get the users posts
export const getUserPosts = asyncHandler(async (req, res) => {
  const posts = await Posts.find({ creator: req.user.id });

  res.status(200).json(posts);
});
