import axios from "axios";

const API_URL = "http://localhost:5000/users";

//get all users
const getAllUsers = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

const userService = {
  getAllUsers,
};

export default userService;
