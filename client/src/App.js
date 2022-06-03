import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile/Profile";
import PageNotFound from "./pages/PageNotFound";
import Explore from "./pages/Explore";
import ProtectRoute from "./utils/ProtectRoute";
import LayoutWithoutNav from "./utils/LayoutWithoutNav";
import LayoutWithNav from "./utils/LayoutWithNav";
import NewPost from "./pages/NewPost/NewPost";
import UserPosts from "./components/UserPosts";

function App() {
  return (
    <div>
      <Routes>
        <Route element={<LayoutWithoutNav />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageNotFound />} />
        </Route>
        <Route element={<LayoutWithNav />}>
          <Route element={<ProtectRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/posts">
              <Route path="new" element={<NewPost />} />
            </Route>
            <Route path="/user">
              <Route path="me" element={<Profile />}>
                <Route path="posts" element={<UserPosts />} />
                <Route path="subscriptions" element={<Profile />} />
                <Route path="wallet" element={<Profile />} />
                <Route path="settings" element={<Profile />} />
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
