import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import SimplePost from "../components/SimplePost";
import {
  purchaseContent,
  reset as userReset,
} from "../features/auth/authSlice";
import {
  connectWallet,
  reset,
  sendTransaction,
} from "../features/transactions/transactionSlice";

const Transaction = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const {
    user,
    isError: userError,
    message: userMsg,
    isLoading: userLoading,
  } = useSelector((state) => state.auth);

  const { account, isError, message, isLoading } = useSelector(
    (state) => state.transaction
  );

  const { post = "", creator = "" } = location.state;

  useEffect(() => {
    if (!account) {
      Promise.all([dispatch(connectWallet())]).then(() => {
        dispatch(reset());
      });
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
      dispatch(reset());
    }

    if (userError) {
      toast.error(userMsg);
      dispatch(userReset());
    }
    // eslint-disable-next-line
  }, [isError, userError]);

  const handleBuy = () => {
    if (user.purchasedContent.includes(post._id)) {
      toast.error("Content is already purchased");
    } else {
      const transaction = {
        account: account,
        addressTo: creator.metaMaskAccount,
        amount: post.price.toString(),
        postid: post._id,
        payerUserId: user._id,
      };
      Promise.all([dispatch(sendTransaction(transaction))])
        .then(() => {
          dispatch(purchaseContent(post._id));
        })
        .then(() => {
          toast.success("Purchased successfully");
          dispatch(userReset());
          dispatch(reset());
        });
    }
  };

  if (isLoading || userLoading) {
    return <p>Transaction is happening....</p>;
  }
  return (
    <div className="flex flex-row justify-center">
      <div className="bg-[#EAEEF3] p-4 px-12 rounded-xl flex flex-col justify-start">
        <p className="bg-white text-[#4E8BFF] font-semibold text-2xl px-4 py-2 rounded-xl self-start">
          Buy Content
        </p>
        <SimplePost post={post} creator={creator} />
        <div className="bg-white my-4 "></div>
        <button onClick={handleBuy}>Buy</button>
      </div>
    </div>
  );
};

export default Transaction;
