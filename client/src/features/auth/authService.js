import axios from "axios";

const API_URL = "http://localhost:5000/users";

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  //console.log(response);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//logout user
const logout = async () => {
  localStorage.removeItem("user");
};

//login user
const login = async (userData) => {
  const response = await axios.post(`${API_URL}/login`, userData);
  if (response.data) {
    localStorage.setItem("user", JSON.stringify(response.data));
  }

  return response.data;
};

//login user
const getPosts = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(`${API_URL}/posts`, config);
  return response.data;
};

//subscribe to a user
const subscribe = async (userid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `${API_URL}/subscribes/${userid}`,
    {},
    config
  );
  return response.data;
};

//unsubscribe from a user
const unsubscribe = async (userid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `${API_URL}/subscribes/${userid}`,
    config
  );
  return response.data;
};

//follow to a user
const follow = async (userid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}/follows/${userid}`, {}, config);
  return response.data;
};

//unsubscribe from a user
const unfollow = async (userid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(`${API_URL}/follows/${userid}`, config);
  return response.data;
};

//like a post
const likePost = async (postid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `http://localhost:5000/posts/${postid}/likes`,
    {},
    config
  );
  return response.data;
};

//unlike a post
const unlikePost = async (postid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(
    `http://localhost:5000/posts/${postid}/likes`,
    config
  );
  return response.data;
};

//create a comment
const createComment = async (postid, comment, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `http://localhost:5000/comments/${postid}`,
    comment,
    config
  );
  //console.log(response);
  return response.data;
};

//purchased content
const purchaseContent = async (postid, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(
    `http://localhost:5000/posts/${postid}/purchase`,
    {},
    config
  );
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  getPosts,
  subscribe,
  unsubscribe,
  follow,
  unfollow,
  likePost,
  createComment,
  purchaseContent,
  unlikePost,
};

export default authService;
