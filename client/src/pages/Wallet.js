import metamask from "../assets/vectors/metamask.svg";
import ethereum from "../assets/vectors/ethereum.svg";
import SingleTransaction from "../components/SingleTransaction";

const Wallet = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col bg-[#EAEEF3] rounded-xl py-4 px-20 w-2/3 ">
        <div className="bg-white flex flex-col justify-center self-center w-2/3 rounded-xl py-4 mb-4 ">
          <div className="flex flex-row justify-between px-6 py-4 ">
            <p className="text-[#0368FF] font-semibold text-lg">My Currency</p>
            <p className="bg-[#EAEEF3] rounded-xl py-2 px-6 text-[#606A7A] text-xs cursor-pointer hover:underline">
              #9382...238
            </p>
          </div>
          <div className="bg-[#EBF2FF] px-10 py-8 self-center rounded-xl flex flex-row justify-between items-center">
            <img src={metamask} alt="" />
            <div className="mx-6 items-center flex">
              <p className="inline text-[#0368FF] font-medium text-2xl">0.62</p>
              <img src={ethereum} alt="" className="inline" />
            </div>
            <button className="border border-[#0368FF] bg-white text-[#0368FF] px-4 py-2 rounded-xl font-semibold text-base">
              Purchase <p>Coin</p>
            </button>
          </div>
        </div>
        <p className="text-[#0368FF] font-semibold text-lg py-4">History</p>
        <hr className="border-1/2 border-[#ABABAB] py-2" />

        <SingleTransaction />
        <SingleTransaction />
        <SingleTransaction />
      </div>
    </div>
  );
};

export default Wallet;
