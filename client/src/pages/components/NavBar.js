import { Link } from "react-router-dom";
import searchIcon from "../../assets/vectors/search.svg";
const NavBar = () => {
  return (
    <div className="py-4 sm:px-16 px-2 flex flex-row items-center ">
      <Link to={"/"}>
        <p className="sm:text-4xl text-2xl font-semibold xl:mr-28 mr-4">OLTA</p>
      </Link>
      <div className="flex flex-row xl:w-96  px-4 bg-neutral-50/[.97] gap-2.5 rounded-xl p-2 items-center xl:mr-12 mr-4 3xl:mr-48 sm:h-9 h-8 ">
        <img src={searchIcon} alt="" className="inline" />
        <input
          type="search"
          className="bg-neutral-50/[.97] focus:outline-none w-full "
          placeholder="Search"
        />
      </div>
      <div className="flex flex-row lg:basis-5/12 basis-8/12 justify-between   items-center text-[#4A5567]  mx-4   hidden md:flex">
        <button className="hover:text-[#4A5567]/70 px-1 ">New Post</button>
        <Link to={"/"}>
          <p className="hover:text-[#4A5567]/70 px-1 ">Wallet</p>
        </Link>
        <button className="hover:text-[#4A5567]/70 px-1 ">Sign Out</button>
      </div>
      <div className="md:hidden mx-4">
        <select>
          <option>
            {" "}
            <button className="hover:text-[#4A5567]/70 ">New Post</button>
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
      <div className="xl:basis-5/12 md:basis-3/12 flex flex-row ml-auto justify-end items-center items-end xsm:flex hidden ">
        <p className="mx-2 text-[#4E5D78] lg:text-xl text-base lg:font-semibold	font-normal hidden lg:inline hover:text-[#4A5567]/70">
          Alex Daniel
        </p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          className="lg:h-12 lg:w-12 w-8 h-8 lg:rounded-xl ml-2 rounded-full "
          alt="profile"
        ></img>
      </div>
    </div>
  );
};

export default NavBar;

// "text-[#4A5567]"

/* 
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
      <div className="flex flex-row lg:justify-between 3xl:w-1/4 lg:w-1/2 w-full items-center text-[#4A5567] flex-left mx-4 md:flex hidden ">
        <button className="hover:text-[#4A5567]/70 px-4 ">New Post</button>
        <Link to={"/"}>
          <p className="hover:text-[#4A5567]/70 px-4 ">Wallet</p>
        </Link>
        <button className="hover:text-[#4A5567]/70 px-4 ">Sign Out</button>
      </div>
      <div className="md:hidden mx-8">
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
      <div className="lg:w-1/5  3xl:w-3/5 flex lg:flex-row flex-col ml-4 lg:justify-end lg:items-center items-end">
        <p className="mx-2 text-[#4E5D78] lg:text-xl text-base lg:font-semibold	font-normal">
          Alex Daniel
        </p>
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8FuEJbKwDdaz1h387130xmYkAIQbZpahhbQ&usqp=CAU"
          className="lg:h-12 lg:w-12 w-8 h-8 lg:rounded-xl mx-2 rounded-full "
        ></img>
      </div>
    </div>
*/
