import { Link, Route, Routes } from "react-router-dom";

import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
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
          <Link to={"/signin"}>Sign In Page</Link>
        </div>
        <div>
          <Link to={"/signup"}>Sign up Page</Link>
        </div>
        <div>
          <Link to={"/profile"}>Profile Page</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
