import { Link, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div>
      <nav>
        <div>
          <Link to={"/"}>Home Page</Link>
        </div>
        <div>
          <Link to={"/login"}>Login Page</Link>
        </div>
        <div>
          <Link to={"/register"}>Register Page</Link>
        </div>
        <div>
          <Link to={"/profile"}>Profile Page</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
