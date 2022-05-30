import NavBar from "../pages/components/NavBar";
import SideBar from "../pages/components/SideBar";
import { Outlet } from "react-router";

const LayoutWithNav = () => {
  return (
    <>
      <nav className="sticky top-0 z-10">
        <NavBar />
      </nav>
      <div className="flex flex-row">
        <SideBar />
        <div className="p-4">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default LayoutWithNav;
