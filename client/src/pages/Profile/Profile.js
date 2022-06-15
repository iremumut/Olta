import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, Outlet, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import FollowSubscribe from "../../components/FollowSubscribe";
import "./Profile.css";

const Profile = () => {
  const { user: loggedInUser } = useSelector((state) => state.auth);
  const { users } = useSelector((state) => state.user);

  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [followerCount, setFollowerCount] = useState(0);
  const [subCount, setSubCount] = useState(0);
  const [followedCount, setFollowedCount] = useState(0);

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

    const found = users.find((x) => x._id === userid);
    if (found) {
      setUser(found);
      setIsLoading(false);
    } else {
      fetchUser();
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (user.length !== 0) {
      setFollowedCount(user.followed.length);
      setFollowerCount(user.followers.length);
      setSubCount(user.subscribers.length);
    }
    // eslint-disable-next-line
  }, [user.length, user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  //console.log(user);
  return (
    <div className="flex flex-row p-4 page-bg justify-center">
      {/*profile part */}
      <div className="flex flex-col rounded-xl 2xl:basis-1/2 xl:basis-2/3 basis-full bg-white xl:ml-6 ml-0">
        {/*header part */}
        <div className="flex flex-row items-center justify-between header-bg object-fill xl:px-10 px-4 py-8 rounded-t-lg">
          <div className="flex flex-row items-center">
            <img
              className="md:h-20 md:w-20 h-14 w-14 rounded-full mr-3 ring ring-[#4E5D78]"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
              alt=""
            />
            <div className="sm:inline hidden">
              <p className="text-[#4E5D78] font-semibold	text-xl w-12 capitalize ">
                {user.name}
              </p>
              <p>@{user.userName ? user.userName : ""}</p>
            </div>
          </div>
          <div className="flex flex-row ">
            <Link
              className="text-center font-semibold lg:text-lg text-sm px-2 hover:text-black/50"
              to={`/users/${user._id}/followers`}
            >
              {followerCount} <p className="font-light ">Followers</p>
            </Link>
            <Link
              className="text-center font-semibold lg:text-lg text-sm px-2 hover:text-black/50"
              to={`/users/${user._id}/subscribers`}
            >
              {subCount} <p className="font-light">Subs</p>
            </Link>
            <Link
              className="text-center font-semibold lg:text-lg text-sm px-2 hover:text-black/50"
              to={`/users/${user._id}/following`}
            >
              {followedCount} <p className="font-light">Following</p>
            </Link>
          </div>
        </div>
        {/*description part */}
        <div className="px-12 py-4 flex flex-col justify-center items-center">
          {user.descriptioLinkn ? (
            <div className="text-center py-4"> {user.description} </div>
          ) : (
            ""
          )}
          {user ? (
            <FollowSubscribe
              userToFollow={user}
              setFollowedCount={setFollowedCount}
              setFollowerCount={setFollowerCount}
              setSubCount={setSubCount}
            />
          ) : (
            ""
          )}
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
