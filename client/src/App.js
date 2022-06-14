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
import Transaction from "./pages/Transaction";
import MyComments from "./components/MyComments";
import PurchasedContent from "./components/PurchasedContent";
import Wallet from "./pages/Wallet";
import Subscriptions from "./pages/Subscriptions";
import Followers from "./components/Followers";
import Followed from "./components/Followed";
import Subscribed from "./components/Subscribed";
import Subscribers from "./components/Subscribers";
import PostEdit from "./components/PostEdit";

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
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/posts">
              <Route path="new" element={<NewPost />} />
              <Route path=":postid" element={<SinglePost />} />
              <Route path=":postid/edit" element={<PostEdit />} />
            </Route>
            <Route path="/transaction/:postid" element={<Transaction />} />
            <Route path="/users/me/wallet" element={<Wallet />} />
            <Route path="/users">
              <Route path="me" element={<MyProfile />}>
                <Route path="posts" element={<UserPosts />} />
                <Route path="comments" element={<MyComments />} />
                <Route path="followers" element={<Followers />} />
                <Route path="following" element={<Followed />} />
                <Route path="subscribers" element={<Subscribers />} />
                <Route path="subscribed" element={<Subscribed />} />
                <Route path="likedPosts" element={<LikedPosts />} />
                <Route path="purchased" element={<PurchasedContent />} />
                <Route path="subscriptions" element={<Profile />} />
                <Route path="settings" element={<Profile />} />
              </Route>
              <Route path=":userid" element={<Profile />}>
                <Route path="posts" element={<UserPosts />} />
                <Route path="followers" element={<Followers />} />
                <Route path="following" element={<Followed />} />
                <Route path="subscribers" element={<Subscribers />} />
                <Route path="subscribed" element={<Subscribed />} />
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
