import Users from "../models/user.js";
import Posts from "../models/post.js";
import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  validateObjectID,
  checkPostFound,
  checkUserFound,
} from "./errorHandling.js";
import Comments from "../models/comment.js";

//GET /users, private, get all users
export const getAllUsers = asyncHandler(async (req, res) => {
  const users = await Users.find();
  if (!users) {
    res.status(404);
    throw new Error("Resource could not be found");
  }
  res.status(200).json(users);
});

//POST /users , public , register a new user
export const registerUser = asyncHandler(async (req, res) => {
  const { name, username, email, password } = req.body;
  if (!name || !username || !email || !password) {
    res.status(404);
    throw new Error("Please add all fields");
  }

  //Check if user exists
  const userExistsByEmail = await Users.findOne({ email: email });
  const userExistsByUsername = await Users.findOne({ userName: username });

  if (userExistsByEmail) {
    res.status(400);
    throw new Error("User with the same email already exists.");
  }

  if (userExistsByUsername) {
    res.status(400);
    throw new Error("User with the same username already exists.");
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

//POST /users/login , public, login user
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404);
    throw new Error("Please input email and password.");
  }
  //Check for user email
  const user = await Users.findOne({ email: email });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      username: user.username,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid credentials");
  }
});

//GET /users/me , private , get the logged in user
export const getUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //check if user is found

  res.status(200).json({
    ...user._doc,
  });
});

//PUT /users , private, update the logged in user
export const updateUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //check if user is found

  const { password } = req.body;

  if (password) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    req.body = {
      ...req.body,
      password: hashedPassword,
    };
  } else {
    req.body = {
      ...req.body,
      password: user.password,
    };
  }

  req.body = {
    ...req.body,
    _id: user._id,
    userName: user.userName,
    email: user.email,
    posts: user.posts,
    purchasedContent: user.purchasedContent,
    likedPosts: user.likedPosts,
    comments: user.comments,
    followed: user.followed,
    followers: user.followers,
    subscribedTo: user.subscribedTo,
    subscribers: user.subscribers,
    transactions: user.transactions,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };

  const updatedUser = await Users.findByIdAndUpdate(req.user.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedUser);
});

//DELETE /users, private, delete the logged in user
export const deleteUser = asyncHandler(async (req, res) => {
  const user = await Users.findByIdAndDelete(req.user.id);
  checkUserFound(res, user); //check if user is found
  res.status(200).json(user);
});

//GET /users/:userid, private , get another user
export const getAnotherUser = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid); //check if it's a valid id

  const user = await Users.findById(userid);
  checkUserFound(res, user); //check if the user is found

  res.status(200).json({
    name: user.name,
    userName: user.userName,
    description: user.description,
    profilePicture: user.profilePicture,
    subscriptionAmount: user.subscriptionAmount,
    openSubscription: user.openSubscription,
    posts: user.posts,
    likedPosts: user.likedPosts,
    comments: user.comments,
    followed: user.followed,
    followers: user.followers,
    subscribedTo: user.subscribedTo,
    subscribers: user.subscribers,
  });
});

//GET /users/posts , private , get the users posts
export const getUserPosts = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //check if the user is found

  const posts = await Posts.find({ creator: req.user.id });
  checkPostFound(res, posts); //check if the post is found

  res.status(200).json(posts);
});

//GET /users/:userid/posts , private, get another user's posts
export const getAnotherUserPosts = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid); //check if it's a valid id

  const user = await Users.findById(userid);
  checkUserFound(res, user); //check if the user is found

  const posts = await Posts.find().where("_id").in(user.posts);

  res.status(200).json(posts);
});

//GET /users/likedPosts, private, get the logged in users liked posts
export const getLikedPosts = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user); //check if user exists

  const posts = await Posts.find().where("_id").in(user.likedPosts);
  res.status(200).json(posts);
});

//GET /users/:userid/likedPosts, private, get the logged in users liked posts
export const getAnotherUserLikedPosts = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid); //check if its a valid id

  const user = await Users.findById(userid);
  checkUserFound(res, user); //check if user exists

  const posts = await Posts.find().where("_id").in(user.likedPosts);
  res.status(200).json(posts);
});

//GET /users/comments, private, get users comments
export const getUserComments = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const comments = await Comments.find().where("_id").in(user.comments);
  res.status(200).json(comments);
});

//GET /users/:userid/comments, private, get another users comments
export const getAnotherUserComments = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid);

  const user = await Users.findById(userid);
  checkUserFound(res, user);

  const comments = await Comments.find().where("_id").in(user.comments);
  res.status(200).json(comments);
});

//POST /users/follows/:userid , private, follow a user
export const followUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const { userid } = req.params;
  validateObjectID(res, userid);

  const userToFollow = await Users.findById(userid);
  checkUserFound(res, userToFollow);

  if (user.followed.includes(userToFollow._id)) {
    res.status(404);
    throw new Error("User already followed");
  }

  if (user._id.toString() == userToFollow._id.toString()) {
    res.status(404);
    throw new Error("Cannot follow yourself");
  }

  user.followed.push(userToFollow._id);
  await user.save();
  userToFollow.followers.push(user);
  await userToFollow.save();

  res.status(200).json(user);
});

//DELETE /users/follows/:userid , private, follow a user
export const unfollowUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const { userid } = req.params;
  validateObjectID(res, userid);

  const userToUnfollow = await Users.findById(userid);
  checkUserFound(res, userToUnfollow);

  if (!user.followed.includes(userToUnfollow._id)) {
    res.status(404);
    throw new Error("User is already not followed");
  }

  user.followed.remove(userToUnfollow._id);
  await user.save();
  userToUnfollow.followers.remove(user);
  await userToUnfollow.save();

  res.status(200).json(user);
});

//GET /users/followers , private , get user's followers
export const getUserFollowers = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const followers = await Users.find().where("_id").in(user.followers);

  res.status(200).json(followers);
});

//GET /users/followed , private , get the ppl user followes
export const getUserFollowed = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const followed = await Users.find().where("_id").in(user.followed);

  res.status(200).json(followed);
});

//GET /users/:userid/followers , private , get another user's followers
export const getAnotherUserFollowers = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid);

  const user = await Users.findById(userid);
  checkUserFound(res, user);

  const followers = await Users.find().where("_id").in(user.followers);

  res.status(200).json(followers);
});

//GET /users/:userid/followed , private , get the ppl another user followes
export const getAnotherUserFollowed = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid);

  const user = await Users.findById(userid);
  checkUserFound(res, user);

  const followed = await Users.find().where("_id").in(user.followed);

  res.status(200).json(followed);
});

//POST /users/subscribes/:userid , private, subscribe to a user
export const subscribeUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const { userid } = req.params;
  validateObjectID(res, userid);

  const userToSubscribe = await Users.findById(userid);
  checkUserFound(res, userToSubscribe);

  if (user.subscribedTo.includes(userToSubscribe._id)) {
    res.status(404);
    throw new Error("Already subscribed to the user");
  }

  if (user._id.toString() == userToSubscribe._id.toString()) {
    res.status(404);
    throw new Error("Cannot subscribe to yourself");
  }

  //@TODO Additional operations to get money for the subscription

  user.subscribedTo.push(userToSubscribe._id);
  await user.save();
  userToSubscribe.subscribers.push(user);
  await userToSubscribe.save();

  res.status(200).json(user);
});

//DELETE /users/subscribes/:userid , private, unsubscribes from a user
export const unsubscribeUser = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const { userid } = req.params;
  validateObjectID(res, userid);

  const userToUnsubscribe = await Users.findById(userid);
  checkUserFound(res, userToUnsubscribe);

  if (!user.subscribedTo.includes(userToUnsubscribe._id)) {
    res.status(404);
    throw new Error("Already not subscribed to the user");
  }

  //@TODO Additional operations to not get money for the subscription

  user.subscribedTo.remove(userToUnsubscribe._id);
  await user.save();
  userToUnsubscribe.subscribers.remove(user);
  await userToUnsubscribe.save();

  res.status(200).json(user);
});

//GET /users/subscribers , private , get user's subscribers
export const getUserSubscribers = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const subscribers = await Users.find().where("_id").in(user.subscribers);

  res.status(200).json(subscribers);
});

//GET /users/subscribedTo , private , get users that the user is subscribed to
export const getUserSubscribedTo = asyncHandler(async (req, res) => {
  const user = await Users.findById(req.user.id);
  checkUserFound(res, user);

  const subscribedTo = await Users.find().where("_id").in(user.subscribedTo);

  res.status(200).json(subscribedTo);
});

//GET /users/:userid/subscribers , private , get another user's subscribers
export const getAnotherUserSubscribers = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid);

  const user = await Users.findById(userid);
  checkUserFound(res, user);

  const subscribers = await Users.find().where("_id").in(user.subscribers);

  res.status(200).json(subscribers);
});

//GET /users/:userid/subscribed , private , get another user's subscribed to
export const getAnotherUserSubscribed = asyncHandler(async (req, res) => {
  const { userid } = req.params;
  validateObjectID(res, userid);

  const user = await Users.findById(userid);
  checkUserFound(res, user);

  const subscribedTos = await Users.find().where("_id").in(user.subscribedTo);

  res.status(200).json(subscribedTos);
});

const generateToken = (id) => {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
