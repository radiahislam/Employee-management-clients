import React, { useContext } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthProvider";
const SideNav = () => {
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);
  if (!user) {
    navigate("/adminLogin");
  }
  return (
    <div className="">
      <ul className="px-5 pt-5 menu text-base-content">
        <li>
          <Link
            to="/dashboard"
            className={`flex items-center justify-between mt-2 rounded-sm`}
          >
            <p>Dashboard</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/employees"
          >
            <p>Employees</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/leaveManagement"
          >
            <p>Leave Management</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/clients"
          >
            <p>Clients</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/adminTask"
          >
            <p>Task</p>
            <IoIosArrowForward />
          </Link>
        </li>

        
      </ul>
    </div>
  );
};

export default SideNav;
