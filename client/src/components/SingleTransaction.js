import ethereum from "../assets/vectors/ethereum.svg";
import arrow from "../assets/vectors/arrow.svg";
import { Link } from "react-router-dom";
const SingleTransaction = () => {
  return (
    <Link
      to={"/"}
      className="my-2 bg-white w-full px-12 py-8 rounded-xl flex flex-row justify-between items-center hover:shadow-xl"
    >
      <p className="text-[#606A7A] text-base font-light">
        Subscribed to <span className="text-[#0368FF]">Benjamin Broke</span>
      </p>
      <div className="items-center flex">
        <p className="inline text-[#0368FF] font-medium text-2xl">-0.62</p>
        <img src={ethereum} alt="" className="inline" />
      </div>
      <Link to="/">
        <img src={arrow} alt="" />
      </Link>
    </Link>
  );
};

export default SingleTransaction;
