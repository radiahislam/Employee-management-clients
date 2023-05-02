import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { FaUmbrellaBeach, FaUserTie, FaUsers } from "react-icons/fa";
import { TbUserMinus } from "react-icons/tb";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { IoTicketSharp } from "react-icons/io5";
import { AuthContext } from "../../../contexts/AuthProvider";
import EmployeeLeaves from "./EmployeeLeaves";
import "./EmployeeDashboard.css";
const EmployeeDashboard = () => {
  const { user } = useContext(AuthContext);
  const data = [
    {
      name: "Monday",
      hours: 6.3,
    },
    {
      name: "Tuesday",
      hours: 5.5,
    },
    {
      name: "Wednesday",
      hours: 4.1,
    },
    {
      name: "Thursday",
      hours: 6.7,
    },
    {
      name: "Friday",
      hours: 2.2,
    },
    {
      name: "Saturday",
      hours: 4.3,
    },
  ];
  // ******************* Load Data start *******************

  const { data: task = [] } = useQuery({
    queryKey: ["task"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/task/").then(
        (res) => res.json()
      ),
  });
  // ******************* Load Data End *********************

  const { data: leaves = [] } = useQuery({
    queryKey: ["leaves"],
    queryFn: () =>
      fetch(
        `https://employee-management-server-sooty.vercel.app/leaves?email=${user?.email}`
      ).then((res) => res.json()),
  });

  // ******************* Load Data start *******************

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/clients").then(
        (res) => res.json()
      ),
  });

  // ******************* Load Data End *********************
  return (
    <div className="h-screen">
      <h1>Dashboard</h1>
      <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="card rounded-md bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="bg-warning rounded-xl p-4">
                  <IoTicketSharp className="text-4xl  text-white" />
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-bold">{task.length}</h1>
                  <p className="text-xl">New Tickets</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-md bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="bg-accent rounded-xl p-4">
                  <TbUserMinus className="text-4xl  text-white" />
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-bold">{leaves.length}</h1>
                  <p className="text-xl">Leave Management</p>
                </div>
              </div>
            </div>
          </div>
          <div className="card rounded-md bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="bg-error rounded-xl p-4">
                  <FaUmbrellaBeach className="text-4xl  text-white" />
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-bold">34</h1>
                  <p className="text-xl">Available Leaves</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:flex justify-between ">
        <div className="mt-10 bg-base-100 p-5 rounded-md shadow-xl lg:mr-5">
          <h1 className="mb-2 text-2xl">Weekly Working Hours</h1>
          <ResponsiveContainer className="barChart" height="87%">
            <AreaChart
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <ReferenceLine x="Page C" stroke="green" label="Min PAGE" />
              <ReferenceLine
                y={4000}
                label="Max"
                stroke="red"
                strokeDasharray="3 3"
              />
              <Area
                type="monotone"
                dataKey="hours"
                stroke="#8884d8"
                fill="#674FCA"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-10 bg-base-100 p-5 rounded-md shadow-xl">
          <div className="overflow-x-auto">
            <h1 className="mb-2 text-2xl">Leaves</h1>
            <EmployeeLeaves />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;
