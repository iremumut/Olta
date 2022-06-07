import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllTransactions,
  sendTransaction,
} from "../features/transactions/transactionSlice";

function Explore() {
  const dispatch = useDispatch();

  useEffect(() => {
    const transaction = {
      account: "0x343b8afa4998d321efe832fb8adf8bb310e62783",
      addressTo: "0x445049B28F4f0F403290ec9F48De1a1771f4637C",
      amount: "0.00005",
      postid: "12345678901",
      payerUserId: "irem",
    };
    //dispatch(sendTransaction(transaction));
    dispatch(getAllTransactions());
  }, []);
  return (
    <div>
      <p>Explore</p>
    </div>
  );
}
export default Explore;
