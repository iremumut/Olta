import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  reset,
  subscribe,
  unsubscribe,
  follow as followFun,
  unfollow,
} from "../features/auth/authSlice";

const FollowSubscribe = ({
  userToFollow,
  setFollowedCount,
  setFollowerCount,
  setSubCount,
}) => {
  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const [follow, setFollow] = useState(false);
  const [subscriber, setSubscribe] = useState(false);

  useEffect(() => {
    console.log(user);
    if (user.followed.includes(userToFollow._id)) {
      console.log("here");
      setFollow(true);
    }

    if (user.subscribedTo.includes(userToFollow._id)) {
      setSubscribe(true);
    }

    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      dispatch(reset());
    }
    // eslint-disable-next-line
  }, [user, isError, isSuccess]);

  const handleSubscribe = async () => {
    dispatch(subscribe(userToFollow._id));
    setSubCount((prev) => prev + 1);
    setSubscribe(true);
  };

  const handleUnsubscribe = () => {
    dispatch(unsubscribe(userToFollow._id));
    setSubCount((prev) => prev - 1);
    setSubscribe(false);
  };

  const handleFollow = async () => {
    dispatch(followFun(userToFollow._id));
    setFollowerCount((prev) => prev + 1);
    setFollow(true);
  };

  const handleUnfollow = () => {
    dispatch(unfollow(userToFollow._id));
    setFollowerCount((prev) => prev - 1);
    setFollow(false);
  };

  return (
    <div className="flex flex-row justify-center">
      <>
        <button
          onClick={subscriber ? handleUnsubscribe : handleSubscribe}
          className="px-4 py-2  m-2 text-white rounded-xl bg-[#4E8BFF] hover:bg-[#4E8BFF]/70"
        >
          {subscriber ? "Unsubscribe" : "Subscribe"}
        </button>
        <button
          onClick={follow ? handleUnfollow : handleFollow}
          className="px-4 py-2 w-28 border border-[#4E8BFF] rounded-xl text-[#4E8BFF] m-2 hover:bg-[#4E8BFF] hover:text-white"
        >
          {follow ? "Unfollow" : "Follow"}
        </button>{" "}
      </>
    </div>
  );
};

export default FollowSubscribe;
