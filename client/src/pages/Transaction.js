import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import ethereum from "../assets/vectors/ethereum.svg";

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

  const navigate = useNavigate();

  useEffect(() => {
    Promise.all([dispatch(connectWallet())]).then(() => {
      dispatch(reset());
    });
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
        postID: post._id,
        payerID: user._id,
        recieverID: creator._id,
        message: "content",
      };

      Promise.all([dispatch(sendTransaction(transaction))]).then((res) => {
        if (res[0].error) {
          toast.error(res[0].error);
        } else {
          Promise.all([
            dispatch(purchaseContent(post._id)),
            dispatch(userReset()),
            dispatch(reset()),
          ]).then(() => {
            toast.success("Purchased successfully");
            navigate(`/posts/${post._id}`);
          });
        }
      });
    }
  };

  if (isLoading || userLoading) {
    return <p>Transaction is happening....</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-row justify-center w-2/3">
        <div className="bg-[#EAEEF3] p-4 px-24 rounded-xl flex flex-col justify-start">
          <p className="bg-white text-[#4E8BFF] font-semibold text-2xl px-4 py-2 rounded-xl self-start">
            Buy Content
          </p>
          <SimplePost post={post} creator={creator} />
          <div className="bg-white my-4 flex flex-col justify-center px-10 py-6 rounded-xl">
            <p className="text-base font-medium text-center">
              Do you want to support{" "}
              <span className="text-[#0368FF]">{creator.name}</span>'s content?
            </p>
            <div className="bg-[#EBF2FF] flex flex-col items-center p-4 px-8 my-4 self-center rounded-xl">
              <p className="text-[#4A5567] font-bold text-2xl">PRICE</p>
              <div className="flex flex-row justify-center items-center py-4">
                <p className="text-[#0368FF] font-medium text-2xl">
                  {post.price}
                </p>
                <img src={ethereum} alt="" className="" />
              </div>
              <button
                className="bg-white border border-[#0368FF] text-[#0368FF] py-2 px-8 rounded-xl hover:bg-[#0368FF] hover:text-white"
                onClick={handleBuy}
              >
                PAY
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
