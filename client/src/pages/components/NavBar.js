import { Link } from "react-router-dom";
import searchIcon from "../../assets/vectors/search.svg";
const NavBar = () => {
  return (
    <div className="py-4 sm:px-16 px-2 flex flex-row items-center ">
      <Link to={"/"}>
        <p className="text-4xl font-semibold xl:mr-28 mr-4">OLTA</p>
      </Link>
      <div className="flex flex-row w-96 px-4 bg-neutral-50/[.97] gap-2.5 rounded-xl p-2 items-center xl:mr-12 mr-4 3xl:mr-48 h-9 ">
        <img src={searchIcon} alt="" className="inline" />
        <input
          type="search"
          className="bg-neutral-50/[.97] focus:outline-none inline"
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row lg:justify-between 3xl:w-1/4 w-1/2 items-center text-[#4A5567] flex-left mx-4 lg:flex hidden ">
        <button className="hover:text-[#4A5567]/70 ">Create a Post</button>
        <Link to={"/"}>
          <p className="hover:text-[#4A5567]/70  ">Wallet</p>
        </Link>
        <button className="hover:text-[#4A5567]/70">Sign Out</button>
      </div>
      <div className="lg:hidden mx-8">
        <select>
          <option>
            {" "}
            <button className="hover:text-[#4A5567]/70 ">Create a Post</button>
          </option>
          <option>
            {" "}
            <Link to={"/"}>
              <p className="hover:text-[#4A5567]/70  ">Wallet</p>
            </Link>
          </option>
          <option>
            <button className="hover:text-[#4A5567]/70">Sign Out</button>
          </option>
        </select>
      </div>
      <div className="lg:w-2/5 w-full 3xl:w-3/5 flex lg:flex-row flex-col ml-4 lg:justify-end lg:items-center items-end">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          className="lg:h-12 lg:w-12 w-8 h-8 lg:rounded-xl mx-2 rounded-full "
        ></img>
        <p className="mx-2 text-[#4E5D78] lg:text-xl text-base lg:font-semibold	font-normal">
          Alex Daniel
        </p>
      </div>
    </div>
  );
};

export default NavBar;

// "text-[#4A5567]"
