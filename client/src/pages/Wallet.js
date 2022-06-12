import metamask from "../assets/vectors/metamask.svg";
import ethereum from "../assets/vectors/ethereum.svg";
import SingleTransaction from "../components/SingleTransaction";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  connectWallet,
  getAllTransactions,
  reset,
} from "../features/transactions/transactionSlice";
import { toast } from "react-toastify";
import uuid from "react-uuid";
import { ethers } from "ethers";

const Wallet = () => {
  const dispatch = useDispatch();

  const { account, transactions, isLoading, isError, message } = useSelector(
    (state) => state.transaction
  );

  const { user } = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(true);

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const getBalance = async (account) => {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [account, "latest"],
      });
      setBalance(ethers.utils.formatEther(balance));
    };

    Promise.all([dispatch(connectWallet())]).then((res) => {
      dispatch(reset());
      Promise.all([
        dispatch(getAllTransactions(), getBalance(res[0].payload)),
      ]).then(() => {
        setLoading(false);
      });
    });

    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    // eslint-disable-next-line
  }, [isError]);

  if (isLoading || loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-[#EAEEF3] rounded-xl py-4 lg:px-20 px-6 xl:w-2/3 lg:w-5/6 w-full mx-2">
        <div className="bg-white flex flex-col justify-center self-center lg:w-2/3 w-full rounded-xl py-4 mb-4 ">
          <div className="flex flex-row justify-between px-6 py-4 ">
            <p className="text-[#0368FF] font-semibold text-lg">My Currency</p>
            <a
              href={`https://ropsten.etherscan.io/address/${account}`}
              target="_blank"
            >
              <p className="bg-[#EAEEF3] rounded-xl py-2 px-6 text-[#606A7A] text-xs cursor-pointer hover:underline">
                {`${account.slice(0, 5)}...${account.slice(
                  account.length - 4
                )}`}
              </p>
            </a>
          </div>
          <div className="bg-[#EBF2FF] 2xl:px-10 lg:px-4 sm:px-8 px-2 sm:py-8 py-4 self-center rounded-xl flex flex-row justify-between items-center flex-wrap">
            <img src={metamask} alt="" className="" />
            <div className="2xl:mx-6 mx-2 items-center flex">
              <p className="inline text-[#0368FF] font-medium text-2xl">
                {balance !== 0 ? balance.slice(0, 5) : 0.0}
              </p>
              <img src={ethereum} alt="" className="inline" />
            </div>
            <button className="border border-[#0368FF] bg-white text-[#0368FF] px-4 py-2 rounded-xl font-semibold text-base sm:basis-0 basis-full sm:mt-0 mt-6 hover:bg-[#0368FF] hover:text-white">
              Purchase <p>Coin</p>
            </button>
          </div>
        </div>
        <p className="text-[#0368FF] font-semibold text-lg py-4">History</p>
        <hr className="border-1/2 border-[#ABABAB] py-2" />

        {transactions && transactions !== 0 ? (
          transactions.map((transaction) => {
            if (transaction.payerID === user._id) {
              return (
                <SingleTransaction
                  transaction={transaction}
                  key={uuid()}
                  payer={true}
                  reciever={false}
                />
              );
            }
            if (transaction.recieverID === user._id) {
              return (
                <SingleTransaction
                  transaction={transaction}
                  key={uuid()}
                  payer={false}
                  reciever={true}
                />
              );
            }
            return "";
          })
        ) : (
          <p>No transactions...</p>
        )}
      </div>
    </div>
  );
};

export default Wallet;
