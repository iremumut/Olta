import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
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
  }, [user.length]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  //console.log(user);
  return (
    <div className="flex flex-row p-4 page-bg justify-center">
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
              <p>@{user.userName ? user.userName : ""}</p>
            </div>
          </div>
          <div className="flex flex-row ">
            <div className="text-center font-semibold text-lg px-2">
              {followerCount} <p className="font-normal">Followers</p>
            </div>
            <div className="text-center font-semibold text-lg px-2">
              {subCount} <p className="font-normal">Subs</p>
            </div>
            <div className="text-center font-semibold text-lg px-2">
              {followedCount} <p className="font-normal">Following</p>
            </div>
          </div>
        </div>
        {/*description part */}
        <div className="px-12 py-4 flex flex-col justify-center items-center">
          {user.description ? (
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
