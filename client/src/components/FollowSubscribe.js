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
import ethereumIcon from "../assets/vectors/ethereum.svg";
import {
  connectWallet,
  sendTransaction,
  reset as transReset,
} from "../features/transactions/transactionSlice";

const FollowSubscribe = ({
  userToFollow,
  setFollowedCount,
  setFollowerCount,
  setSubCount,
}) => {
  const { user, isError, message, isSuccess } = useSelector(
    (state) => state.auth
  );

  const { account, isLoading } = useSelector((state) => state.transaction);
  const dispatch = useDispatch();

  const [follow, setFollow] = useState(false);
  const [subscriber, setSubscribe] = useState(false);

  useEffect(() => {
    //console.log(user);
    if (user.followed.includes(userToFollow._id)) {
      //console.log("here");
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
    toast.success("Subscribed to the user");
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
    toast.success("Followed user");
  };

  const handleUnfollow = () => {
    dispatch(unfollow(userToFollow._id));
    setFollowerCount((prev) => prev - 1);
    setFollow(false);
  };

  useEffect(() => {
    if (!account || account.length === 0) {
      Promise.all([dispatch(connectWallet())]).then(() => {
        dispatch(reset());
      });
    }
    // eslint-disable-next-line
  }, []);

  const handleSubscribeWithPayment = async () => {
    const transaction = {
      account: account,
      addressTo: userToFollow.metaMaskAccount,
      amount: userToFollow.subscriptionAmount.$numberDecimal.toString(),
      postid: "-",
      payerUserId: user._id,
    };
    Promise.all([dispatch(sendTransaction(transaction))]).then((res) => {
      if (res[0].error) {
        toast.error(res[0].payload);
        dispatch(transReset());
      } else {
        dispatch(subscribe(userToFollow._id));
        setSubCount((prev) => prev + 1);
        setSubscribe(true);
        dispatch(transReset());
        toast.success("Subscribed to the user");
      }
    });
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-row justify-center">
        <>
          <button
            onClick={
              subscriber
                ? handleUnsubscribe
                : userToFollow.openSubscription &&
                  userToFollow.subscriptionAmount &&
                  userToFollow.subscriptionAmount.$numberDecimal !== 0
                ? handleSubscribeWithPayment
                : handleSubscribe
            }
            className="px-4 py-2  m-2 text-[#4E8BFF] rounded-xl border border-[#4E8BFF]  hover:bg-[#4E8BFF] hover:text-white"
          >
            {subscriber ? (
              "Unsubscribe"
            ) : userToFollow.openSubscription &&
              userToFollow.subscriptionAmount &&
              userToFollow.subscriptionAmount.$numberDecimal !== 0 ? (
              isLoading ? (
                "Subscribing..."
              ) : (
                <>
                  <p>Subcribe for</p>{" "}
                  {userToFollow.subscriptionAmount.$numberDecimal}{" "}
                  <img src={ethereumIcon} className="inline" alt="" />
                </>
              )
            ) : (
              "Subscribe"
            )}
          </button>
          <button
            onClick={follow ? handleUnfollow : handleFollow}
            className="px-4 py-2 w-28 border border-[#4E8BFF] rounded-xl text-[#4E8BFF] m-2 hover:bg-[#4E8BFF] hover:text-white"
          >
            {follow ? "Unfollow" : "Follow"}
          </button>{" "}
        </>
      </div>
      {isLoading ? <p>Please wait for the payment to be done.</p> : ""}
    </div>
  );
};

export default FollowSubscribe;
