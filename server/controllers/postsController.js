import PostModel from "../models/post.js";

// Get /posts , private
export const getPosts = async (req, res) => {
  try {
    /*const allPosts = await PostModel.find();
    console.log("heres all posts:", allPosts);
    res.status(200).json(allPosts);*/
    res.status(200).json({ message: "get all posts" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//POST /post , private
export const createPost = async (req, res) => {
  /*const body = req.body;
  const newPost = new PostModel(body);
  try {
    await newPost.save();
    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }*/

  if (!req.body.title) {
    res.status(400);
    throw new Error("Please add a title field");
  }
  //console.log(req.body);
  res.status(200).json({ message: "create post" });
};

//PUT /posts/:id , private
export const updatePost = async (req, res) => {
  res.status(200).json({ message: `update post ${req.params.id}` });
};

//DELETE /posts/:id , private
export const deletePost = async (req, res) => {
  res.status(200).json({ message: `delete post ${req.params.id}` });
};
