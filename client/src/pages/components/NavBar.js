import { Link, useNavigate } from "react-router-dom";
import searchIcon from "../../assets/vectors/search.svg";
import dropdownArrow from "../../assets/vectors/dropdown.svg";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from "../../features/auth/authSlice";

const NavBar = () => {
  const [dropdown, setDropdown] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const changeDropdown = () => {
    setDropdown((prev) => !prev);
  };

  const handleSignOut = async () => {
    await dispatch(logout());
    dispatch(reset());
    navigate("/login");
  };

  return (
    <div className="py-4 sm:px-16 px-2 flex flex-row items-center bg-white">
      <Link to={"/"}>
        <p className="sm:text-4xl text-2xl font-semibold xl:mr-28 mr-4">OLTA</p>
      </Link>
      <div className="flex flex-row xl:w-96  px-4 bg-neutral-50/[.97] gap-2.5 rounded-xl p-2 items-center xl:mr-12 mr-4 3xl:mr-48 sm:h-9 h-8 ">
        <img src={searchIcon} alt="" className="inline" />
        <input
          type="search"
          className="bg-neutral-50/[.97] focus:outline-none w-full "
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row lg:basis-5/12 basis-8/12 justify-between   items-center text-[#4A5567]  mx-4  hidden md:flex">
        <Link to={"/posts/new"} className="hover:text-[#4A5567]/70 px-1 ">
          New Post
        </Link>
        <Link to={"/users/me/wallet"}>
          <p className="hover:text-[#4A5567]/70 px-1 ">Wallet</p>
        </Link>
        <button
          className="hover:text-[#4A5567]/70 px-1 "
          onClick={handleSignOut}
        >
          Sign Out
        </button>
      </div>
      <div className="md:hidden mx-4 text-[#4A5567] relative ">
        <button
          className="xsm:py-2 xsm:px-4 text-center  flex flex-row justify-between items-center w-full relative"
          onClick={changeDropdown}
        >
          <img src={dropdownArrow} className=" inline w-4 h-4" alt="" />
        </button>
        <div
          className={`absolute bg-neutral-50/[.97] text-[#4A5567] w-32 sm:left-0 right-0 md:text-normal text-small rounded-lg shadow ${
            dropdown ? "" : "hidden"
          }`}
        >
          <Link
            className="hover:text-black hover:bg-neutral-300 px-4 py-2 block"
            to={"/posts/new"}
          >
            New Post
          </Link>
          <Link
            className="hover:text-black hover:bg-neutral-300 px-4 py-2 block"
            to={"/users/me/wallet"}
          >
            Wallet
          </Link>
          <Link
            className="hover:text-black hover:bg-neutral-300 px-4 py-2 block"
            to={"/users/me/posts"}
          >
            Profile
          </Link>
          <button
            className="hover:text-black hover:bg-neutral-300 px-4 py-2 block w-full text-left"
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      </div>
      <div className="xl:basis-5/12 md:basis-3/12 flex flex-row ml-auto justify-end items-center items-end xsm:flex hidden ">
        <Link to={"/users/me/posts"}>
          <p className="mx-2 text-[#4E5D78] cursor-pointer lg:text-xl text-base lg:font-semibold	font-normal hidden lg:inline hover:text-[#4A5567]/70">
            {user && user.name ? user.name : "user name"}
          </p>
        </Link>
        <Link to={"/users/me/posts"}>
          <img
            src={
              user && user.profilePicture
                ? user.profilePicture
                : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
            }
            className="lg:h-12 lg:w-12 w-8 h-8 lg:rounded-xl ml-2 rounded-full object-cover cursor-pointer"
            alt="profile"
          ></img>
        </Link>
      </div>
    </div>
  );
};

export default NavBar;
