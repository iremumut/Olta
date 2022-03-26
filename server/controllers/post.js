import PostModel from "../models/post.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find();
    console.log("heres all posts:", allPosts);
    res.status(200).json(allPosts);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const body = req.body;
  const newPost = new PostModel(body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};
