import axios from "axios";

const API_URL = "http://localhost:5000/posts";

//create new post
const createPost = async (post, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(API_URL, post, config);

  return response.data;
};

//get all posts
const getAllPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

//delete a post
const deletePost = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/${id}`, config);

  return response.data;
};

const postService = {
  createPost,
  getAllPosts,
  deletePost,
};

export default postService;
