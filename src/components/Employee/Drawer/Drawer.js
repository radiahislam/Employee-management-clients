import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const Drawer = () => {
  return (
    <div>
      <ul className="px-5 pt-5 menu text-base-content">
        <li>
          <Link
            to="/employeesMain/mainDashboard"
            className={`flex items-center justify-between mt-2 rounded-sm`}
          >
            <p>Dashboard</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/employeesMain/attendance"
          >
            <p>Attendance</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/employeesMain/myLeaves"
          >
            <p>My Leaves</p>
            <IoIosArrowForward />
          </Link>
        </li>
        <li>
          <Link
            className={`flex items-center justify-between mt-2 rounded-sm`}
            to="/employeesMain/task"
          >
            <p>Task</p>
            <IoIosArrowForward />
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Drawer;
