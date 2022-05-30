import axios from "axios";

const API_URL = "http://localhost:5000/users";

//register user
const register = async (userData) => {
  const response = await axios.post(API_URL, userData);
  console.log(response);
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

const authService = {
  register,
  logout,
  login,
};

export default authService;
