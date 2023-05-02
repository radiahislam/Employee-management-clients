import React, { useContext } from "react";
import Navbar from "../Navbar/Navbar";
import SideNav from "../../../Pages/SideNav/SideNav";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider";

const Admin = () => {
  // const { user } = useContext(AuthContext);
  // let navigate = useNavigate();
  // if (user) {
  //   navigate("/dashboard");
  // }
  return (
    <div>
      <Navbar>
        <div className="">
          <div className="fixed left-0 top-13 lg:block hidden  bg-base-300 w-72 h-full z-10">
            <SideNav />
          </div>
          <div className="pt-10 lg:pr-8 bg-base-200 px-2 lg:pl-80">
            {<Outlet />}
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default Admin;
