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
import SinglePost from "./pages/SinglePost";
import MyProfile from "./pages/MyProfile/MyProfile";
import LikedPosts from "./components/LikedPosts";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  checkIfWalletConnected,
  connectWallet,
  sendTransaction,
} from "./features/transactions/transactionSlice";
import Transaction from "./pages/Transaction";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    //dispatch(connectWallet());
  }, []);

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
              <Route path=":postid" element={<SinglePost />} />
            </Route>
            <Route path="/transaction/:postid" element={<Transaction />} />
            <Route path="/users">
              <Route path="me" element={<MyProfile />}>
                <Route path="posts" element={<UserPosts />} />
                <Route path="subscriptions" element={<Profile />} />
                <Route path="wallet" element={<Profile />} />
                <Route path="settings" element={<Profile />} />
                <Route path="likedPosts" element={<LikedPosts />} />
              </Route>
              <Route path=":userid" element={<Profile />}>
                <Route path="posts" element={<UserPosts />} />
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
