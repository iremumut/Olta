import ethereum from "../assets/vectors/ethereum.svg";
import arrow from "../assets/vectors/arrow.svg";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { ethers } from "ethers";

const SingleTransaction = ({ transaction, payer, reciever }) => {
  const [message, setMessage] = useState("");
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const { users } = useSelector((state) => state.user);
  const { user: loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${loggedInUser.token}`,
      },
    };

    //console.log(transaction.payerID);
    //console.log(transaction.recieverID);
    const userid = payer ? transaction.recieverID : transaction.payerID;
    //console.log(userid);
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
      Promise.all([fetchUser()]);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (payer && user && user !== 0) {
      switch (transaction.message) {
        case "content":
          setMessage(
            <>
              Supported <span className="text-[#0368FF]">{user.name}</span>'s
              Content
            </>
          );
          break;
        case "subscription":
          setMessage(
            <>
              Subscribed To <span className="text-[#0368FF]">{user.name}</span>
            </>
          );
          break;
        default:
          break;
      }
    }
    if (reciever && user && user !== 0) {
      switch (transaction.message) {
        case "content":
          setMessage(
            <>
              <span className="text-[#0368FF]">{user.name}</span> Supported Your
              Content
            </>
          );
          break;
        case "subscription":
          setMessage(
            <>
              <span className="text-[#0368FF]">{user.name}</span> Subscribed To
              You
            </>
          );
          break;
        default:
          break;
      }
    }
    // eslint-disable-next-line
  }, [user]);

  if (isLoading) {
    return <p>Loading...</p>;
  }
  return (
    <div
      to={"/"}
      className="my-2 bg-white w-full lg:px-12 px-6 py-8 rounded-xl flex flex-row justify-between items-center hover:shadow-xl flex-wrap"
    >
      <p className="text-[#606A7A] text-base font-light basis-2/3">{message}</p>
      <div className="items-center flex">
        <p className="inline text-[#0368FF] font-medium text-2xl">
          {payer
            ? `-${ethers.utils.formatEther(transaction.amount._hex, 16)}`
            : `+${ethers.utils.formatEther(transaction.amount._hex, 16)}`}
        </p>
        <img src={ethereum} alt="" className="inline" />
      </div>
      <Link
        to={
          transaction.postID === "-"
            ? payer
              ? `/users/${transaction.recieverID}/posts`
              : `/users/${transaction.payerID}/posts`
            : `/posts/${transaction.postID}`
        }
        className="md:basis-4 basis-full w-0 md:w-full"
      >
        <img src={arrow} alt="" />
      </Link>
    </div>
  );
};

export default SingleTransaction;
