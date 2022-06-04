import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css";

const Profile = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  const [user, setUser] = useState(loggedInUser);
  const [isLoading, setIsLoading] = useState(true);

  const { userid } = useParams();

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    const fetchUser = async () => {
      try {
        const response = await axios
          .get(`http://localhost:5000/users/${userid}`, config)
          .then((res) => res.data);
        setUser(response);
        setIsLoading(false);
      } catch (error) {
        toast.error(error.response.data.message);
      }
    };

    if (userid) {
      console.log(userid);
      const found = users.find((x) => x._id === userid);
      if (found) {
        setUser(found);
        setIsLoading(false);
      } else {
        fetchUser();
      }
    }
  }, [loggedInUser.token, user, userid, users]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(user);
  return (
    <div className="flex flex-row p-4 page-bg">
      {/*links */}
      <div className="flex flex-col bg-white p-6 py-4 w-60 rounded-xl h-80">
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
            <Link to={"/users/me/purchased"}>Purchased Content</Link>
          </li>
          <li className="py-2 hover:text-black/70">
            <Link to={"/users/me/transactions"}>Earnings</Link>
          </li>
        </ul>
      </div>

      {/*profile part */}
      <div className="flex flex-col rounded-xl basis-1/2 bg-white ml-6">
        {/*header part */}
        <div className="flex flex-row items-center justify-between header-bg object-fill px-10 py-8 rounded-t-lg">
          <div className="flex flex-row items-center">
            <img
              className="h-20 w-20 rounded-full mr-3 ring ring-[#4E5D78]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
            <div>
              <p className="text-[#4E5D78] font-semibold	text-xl w-12 ">
                {user.name}
              </p>
              <p>{user.username}</p>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="text-center font-semibold text-lg px-2">
              {user.followers ? user.followers.length : 0}{" "}
              <p className="font-normal">Followers</p>
            </div>
            <div className="text-center font-semibold text-lg px-2">
              {user.subscribers ? user.subscribers.length : 0}{" "}
              <p className="font-normal">Subs</p>
            </div>
            <div className="text-center font-semibold text-lg px-2">
              {user.followed ? user.followed.length : 0}{" "}
              <p className="font-normal">Following</p>
            </div>
          </div>
        </div>
        {/*description part */}
        <div className="px-12 py-4 flex flex-row justify-between items-center">
          <div className="w-2/3">
            {user.description ? user.description : ""}
          </div>
          <div className="flex flex-col ">
            {user.token ? (
              <button className="px-4 py-2 w-28 border border-[#4E8BFF] rounded-xl text-[#4E8BFF] m-2 hover:bg-[#4E8BFF] hover:text-white">
                Edit
              </button>
            ) : (
              <>
                {" "}
                <button className="px-4 py-2 w-28 m-2 text-white rounded-xl bg-[#4E8BFF] hover:bg-[#4E8BFF]/70">
                  Subscribe
                </button>
                <button className="px-4 py-2 w-28 border border-[#4E8BFF] rounded-xl text-[#4E8BFF] m-2 hover:bg-[#4E8BFF] hover:text-white">
                  Follow
                </button>{" "}
              </>
            )}
          </div>
        </div>

        {/*others */}
        <div className="bg-[#EAEEF3] px-12 py-6">
          <Outlet context={{ user }} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
