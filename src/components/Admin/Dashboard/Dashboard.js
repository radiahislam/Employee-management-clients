import React, { useContext } from "react";
import { FaUserTie, FaUsers } from "react-icons/fa";
import { TbUserMinus } from "react-icons/tb";
import "./Dashboard.css";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useQuery } from "@tanstack/react-query";
import DashboardFeature from "./DashboardFeature";
const Dashboard = () => {
  const data = [
    {
      name: "Mar 03",
      Project_a: 23000,
      Project_b: 44000,
      Project_c: 30000,
    },
    {
      name: "Apr 03",
      Project_a: 11000,
      Project_b: 55000,
      Project_c: 25000,
    },
    {
      name: "May 03",
      Project_a: 22000,
      Project_b: 41000,
      Project_c: 32000,
    },
    {
      name: "Jun 03",
      Project_a: 27000,
      Project_b: 67000,
      Project_c: 30000,
    },
    {
      name: "Jul 03",
      Project_a: 13000,
      Project_b: 22000,
      Project_c: 45000,
    },
    {
      name: "Aug 03",
      Project_a: 37000,
      Project_b: 21000,
      Project_c: 64000,
    },
    {
      name: "Sep 03",
      Project_a: 21000,
      Project_b: 41000,
      Project_c: 52000,
    },
  ];
  // ******************* Load Data start *******************

  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/users").then(
        (res) => res.json()
      ),
  });
  // ******************* Load Data End *********************

  const { data: leaves = [] } = useQuery({
    queryKey: ["leaves"],
    queryFn: () =>
      fetch(`https://employee-management-server-sooty.vercel.app/leaves`).then(
        (res) => res.json()
      ),
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
    <div className="h-screen overflow-x-hidden">
      <h1>Dashboard</h1>
      <div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 mt-5">
          <div className="card rounded-md bg-base-100 shadow-xl">
            <div className="card-body">
              <div className="flex justify-between items-center">
                <div className="bg-warning rounded-xl p-4">
                  <FaUserTie className="text-4xl  text-white" />
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-bold">{users.length}</h1>
                  <p className="text-xl">Employees</p>
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
                  <FaUsers className="text-4xl  text-white" />
                </div>
                <div className="text-right">
                  <h1 className="text-3xl font-bold">{clients.length}</h1>
                  <p className="text-xl">Clients</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="xl:flex justify-between ">
        <div className="mt-10 bg-base-100 p-5 rounded-md shadow-xl lg:mr-5">
          <h1 className="mb-2 text-2xl">Project Survey</h1>
          <ResponsiveContainer height="87%">
            <AreaChart
              className="barChart"
              data={data}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Area
                type="monotone"
                dataKey="Project_a"
                stroke="#4CB5AC"
                fillOpacity={2}
                strokeWidth="3"
                fill="url(#colorUv)"
              />
              <Area
                type="monotone"
                dataKey="Project_b"
                stroke="#FEA861"
                strokeWidth="3"
                fillOpacity={2}
                fill="url(#colorPv)"
              />
              <Area
                type="monotone"
                dataKey="Project_c"
                stroke="#A1A1A1"
                strokeWidth="3"
                fillOpacity={2}
                fill="url(#colorPv)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-10 bg-base-100 p-5 rounded-md shadow-xl">
          <div className="overflow-x-auto">
            <h1 className="mb-2 text-2xl">Running Task</h1>
            <DashboardFeature />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
