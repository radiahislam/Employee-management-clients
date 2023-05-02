import AdminLogin from "../Pages/Login/AdminLogin/AdminLogin";
import EmployLogin from "../Pages/Login/EmployLogin/EmployLogin";
import NotFound from "../Pages/NotFound/NotFound";
import Admin from "../components/Admin/Admin/Admin";
import AdminTask from "../components/Admin/AdminTask/AdminTask";
import Clients from "../components/Admin/Clients/Clients";
import Dashboard from "../components/Admin/Dashboard/Dashboard";
import AddEmployees from "../components/Admin/Employees/AddEmployees";
import Employees from "../components/Admin/Employees/Employees";
import LeaveManagement from "../components/Admin/LeaveManagement/LeaveManagement";
import Attendance from "../components/Employee/Attendance/Attendance";
import EmployeeDashboard from "../components/Employee/EmployeeDashboard/EmployeeDashboard";
import MainEmployee from "../components/Employee/MainEmployee/MainEmployee";
import MyLeaves from "../components/Employee/My Leaves/MyLeaves";
import Task from "../components/Employee/Task/Task";
import PrivateRoute from "./PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Admin />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard",
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/employees",
        element: (
          <PrivateRoute>
            <Employees />
          </PrivateRoute>
        ),
      },
      {
        path: "/leaveManagement",
        element: (
          <PrivateRoute>
            <LeaveManagement />
          </PrivateRoute>
        ),
      },
      {
        path: "/clients",
        element: (
          <PrivateRoute>
            <Clients />
          </PrivateRoute>
        ),
      },
      {
        path: "/adminTask",
        element: (
          <PrivateRoute>
            <AdminTask />
          </PrivateRoute>
        ),
      },
      {
        path: "/addEmployees",
        element: (
          <PrivateRoute>
            <AddEmployees />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },

  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/employLogin",
    element: <EmployLogin />,
  },
  {
    path: "/employeesMain",
    element: (
      <PrivateRoute>
        <MainEmployee />
      </PrivateRoute>
    ),
    children: [
      {
        path: "/employeesMain/mainDashboard",
        element: (
          <PrivateRoute>
            <EmployeeDashboard />
          </PrivateRoute>
        ),
      },
      {
        path: "/employeesMain/Attendance",
        element: (
          <PrivateRoute>
            <Attendance />
          </PrivateRoute>
        ),
      },
      {
        path: "/employeesMain/myLeaves",
        element: (
          <PrivateRoute>
            <MyLeaves />
          </PrivateRoute>
        ),
      },
      {
        path: "/employeesMain/task",
        element: (
          <PrivateRoute>
            <Task />
          </PrivateRoute>
        ),
      },
    ],
  },
]);
