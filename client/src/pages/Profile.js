import { Link, Outlet } from "react-router-dom";
import "./Profile.css";

const Profile = () => {
  return (
    <div className="flex flex-row p-4 page-bg">
      {/*links */}
      <div className="flex flex-col bg-white p-6 w-60 rounded-xl">
        <ul>
          <li className="py-2">
            <Link to={"/users/me/posts"}>My Posts</Link>
          </li>
          <li className="py-2">
            <Link to={"/users/me/comments"}>My Comments</Link>
          </li>
          <li className="py-2">
            <Link to={"/users/me/subscriptions"}>Subscriptions</Link>
          </li>
          <li className="py-2">
            <Link to={"/users/me/likedPosts"}>Liked Content</Link>
          </li>
          <li className="py-2">
            <Link to={"/users/me/purchased"}>Purchased Content</Link>
          </li>
          <li className="py-2">
            <Link to={"/users/me/purchased"}>Purchased Content</Link>
          </li>
          <li className="py-2">
            <Link to={"/users/me/transactions"}>Earnings</Link>
          </li>
        </ul>
      </div>

      {/*profile part */}
      <div className="flex flex-col rounded-xl basis-1/2 bg-white ml-6">
        {/*header part */}
        <div className="flex flex-row items-center justify-between header-bg object-fill px-12 py-8 rounded-t-lg">
          <div className="flex flex-row items-center">
            <img
              className="h-20 w-20 rounded-full mr-3 ring ring-[#4E5D78]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
            <p className="text-[#4E5D78] font-semibold	text-xl w-12 ">
              Alex Daniel
            </p>
          </div>
          <div className="flex flex-row ">
            <div className="text-center font-semibold text-lg px-2">
              234 <p className="font-normal">Followers</p>
            </div>
            <div className="text-center font-semibold text-lg px-2">
              24 <p className="font-normal">Subs</p>
            </div>
            <div className="text-center font-semibold text-lg px-2">
              124 <p className="font-normal">Following</p>
            </div>
          </div>
        </div>
        {/*description part */}
        <div className="px-12 py-4 flex flex-row justify-between items-center">
          <div className="w-2/3">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
          </div>
          <div className="flex flex-col ">
            <button className="px-4 py-2 w-28 border border-[#4E8BFF] rounded-xl text-[#4E8BFF] m-2 hover:bg-[#4E8BFF] hover:text-white">
              Edit
            </button>
            <button className="px-4 py-2 w-28 m-2 text-white rounded-xl bg-[#4E8BFF] hover:bg-[#4E8BFF]/70">
              Follow
            </button>
          </div>
        </div>

        {/*others */}
        <div className="bg-[#EAEEF3] px-12 py-6">
          Hello posts here
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Profile;
