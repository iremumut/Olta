import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import PageNotFound from "./pages/PageNotFound";
import NavBar from "./pages/components/NavBar";
import SideBar from "./pages/components/SideBar";
import Explore from "./pages/Explore";

function App() {
  return (
    <div>
      <nav className="sticky top-0 z-10">
        <NavBar />
      </nav>
      <div className="flex flex-row">
        <SideBar />
        <div className="bg-zinc-100 p-4 h-screen w-screen">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/user/me" element={<Profile />} />
            <Route path="/user/subscriptions" element={<Profile />} />
            <Route path="/user/wallet" element={<Profile />} />
            <Route path="/user/settings" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
}

export default App;
