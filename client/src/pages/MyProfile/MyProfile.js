import { useSelector } from "react-redux";
import { Link, Outlet } from "react-router-dom";
import "./MyProfile.css";

const MyProfile = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <div className="flex flex-row xl:p-4 px-0 py-4 page-bg">
      {/*links */}
      <div className="flex flex-col bg-white xl:px-6 px-4 py-4 xl:w-60 w-48 rounded-xl  h-full">
        <ul>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/posts"}>My Posts</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/comments"}>My Comments</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/subscriptions"}>Subscriptions</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/likedPosts"}>Liked Content</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/purchased"}>Purchased Content</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/following"}>Followings</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/subscribed"}>Subscribed To</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/transactions"}>Earnings</Link>
          </li>
        </ul>
      </div>

      {/*profile part */}
      <div className="flex flex-col rounded-xl 2xl:basis-1/2 xl:basis-2/3 basis-full bg-white ml-6">
        {/*header part */}
        <div className="flex flex-row items-center justify-between header-bg object-fill lg:px-10 px-4 py-8 rounded-t-lg">
          <div className="flex flex-row items-center">
            <img
              className="md:h-20 md:w-20 h-14 w-14 rounded-full md:mr-3 mr-1 ring ring-[#4E5D78]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
            <div className="md:inline hidden">
              <p className="text-[#4E5D78] font-semibold	text-xl w-12 uppercase ">
                {user.name}
              </p>
              <p className=" font-semibold">
                @{user.userName ? user.userName : ""}
              </p>
            </div>
          </div>
          <div className="flex flex-row flex-wrap justify-end">
            <Link
              className="text-center font-semibold lg:text-lg text-sm px-2 hover:text-black/50"
              to="/users/me/followers"
            >
              {user.followers ? user.followers.length : 0}{" "}
              <p className="font-light">Followers</p>
            </Link>
            <Link
              className="text-center font-semibold lg:text-lg text-sm px-2 hover:text-black/50"
              to="/users/me/subscribers"
            >
              {user.subscribers ? user.subscribers.length : 0}{" "}
              <p className="font-light">Subs</p>
            </Link>
            <Link
              className="text-center font-semibold lg:text-lg text-sm px-2 hover:text-black/50"
              to="/users/me/following"
            >
              {user.followed ? user.followed.length : 0}{" "}
              <p className="font-light">Following</p>
            </Link>
          </div>
        </div>
        {/*description part */}
        <div className="px-12 py-4 flex flex-col justify-center items-center">
          <div className="text-center">
            {user.description ? user.description : ""}
          </div>
          <div className="flex flex-row ">
            <button className="px-4 py-2 w-28 border border-[#4E8BFF] rounded-xl text-[#4E8BFF] m-2 hover:bg-[#4E8BFF] hover:text-white">
              Edit
            </button>
          </div>
        </div>

        {/*others */}
        <div className="bg-[#EAEEF3] lg:px-12 px-4 py-6">
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
};

export default MyProfile;
