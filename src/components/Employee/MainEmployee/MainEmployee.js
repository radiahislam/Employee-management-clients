import React from "react";
import Navbar from "../Navbar/Navbar";
import Drawer from "../Drawer/Drawer";
import { Outlet } from "react-router-dom";

const MainEmployee = () => {
  return (
    <div>
      <Navbar>
        <div className="">
          <div className="fixed left-0 top-13 lg:block hidden  bg-base-300 w-72 h-full z-10">
            <Drawer />
          </div>
          <div className="pt-10 lg:pr-8 bg-base-200 px-2 lg:pl-80">
            {<Outlet />}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default MainEmployee;
