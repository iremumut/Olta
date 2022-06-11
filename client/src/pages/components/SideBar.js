import { Link, useNavigate } from "react-router-dom";
import feed from "../../assets/vectors/feed.svg";
import explore from "../../assets/vectors/explore.svg";
import user from "../../assets/vectors/user.svg";
import subscriptions from "../../assets/vectors/subscriptions.svg";
import wallet from "../../assets/vectors/wallet.svg";
import signOut from "../../assets/vectors/sign-out.svg";
import settings from "../../assets/vectors/settings.svg";
import { useDispatch } from "react-redux";
import { reset, logout } from "../../features/auth/authSlice";

function SideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="md:px-12 py-14 px-2 xsm:block hidden shadow min-h-screen text-[#4E5D78] font-semibold ">
      <ul className="">
        <li className="py-1">
          <Link
            to="/"
            className="flex flex-row items-center w-40 p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
          >
            <img
              src={feed}
              className="inline px-1 group-hover:brightness-0 group-hover:invert"
              alt=""
            />
            <p className="px-2">Feed</p>
          </Link>
        </li>
        <li className="py-1">
          <Link
            to="/explore"
            className="flex flex-row items-center w-40 p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
          >
            <img
              src={explore}
              className="inline group-hover:brightness-0 group-hover:invert "
              alt=""
            />
            <p className="px-2">Explore</p>
          </Link>
        </li>
        <li className="py-1">
          <Link
            to="/users/me/posts"
            className="flex flex-row items-center w-40 p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
          >
            <img
              src={user}
              className="inline group-hover:brightness-0 group-hover:invert"
              alt=""
            />
            <p className="px-2">Profile</p>
          </Link>
        </li>
        <li className="py-1 w-44">
          <Link
            to="/user/subscriptions"
            className="flex flex-row  items-center p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
          >
            <img
              src={subscriptions}
              className="inline  px-1 group-hover:brightness-0 group-hover:invert"
              alt=""
            />
            <p className="px-2">Subscriptions</p>
          </Link>
        </li>
        <li className="py-1">
          <Link
            to="/users/me/wallet"
            className="flex flex-row  items-center w-40 p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
          >
            <img
              src={wallet}
              className="inline group-hover:brightness-0 group-hover:invert"
              alt=""
            />
            <p className="px-2">Wallet</p>
          </Link>
        </li>
        <li className="py-1">
          <Link
            to="/user/settings"
            className="flex flex-row  items-center w-40 p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
          >
            <img
              src={settings}
              className="inline  px-1 group-hover:brightness-0 group-hover:invert"
              alt=""
            />
            <p className="px-2">Settings</p>
          </Link>
        </li>
        <li className="py-1">
          <button
            to="/"
            className="flex flex-row  items-center w-40 p-2 rounded-lg group hover:text-white hover:bg-[#4E5D78]"
            onClick={handleSignOut}
          >
            <img
              src={signOut}
              className="inline  px-1 group-hover:brightness-0 group-hover:invert"
              alt=""
            />
            <p className="px-2 text-[#4E5D78] font-semibold hover:text-white ">
              Sign out
            </p>
          </button>
        </li>
      </ul>
    </div>
  );
}

export default SideBar;
