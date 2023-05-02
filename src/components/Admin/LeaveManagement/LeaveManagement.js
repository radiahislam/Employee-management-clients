import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BiEdit } from "react-icons/bi";
import LeaveManagementModal from "./LeaveManagementModal";

const LeaveManagement = () => {
  const [leave, setLeave] = useState(null);
  // ******************* Load Data start *******************

  const { data: leaves = [], isLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: () =>
      fetch(`https://employee-management-server-sooty.vercel.app/leaves`).then(
        (res) => res.json()
      ),
  });

  // ******************* Load Data End *********************

  return (
    <div className="h-screen">
      <div className="text-sm breadcrumbs">
        <ul className="text-lg">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Leave Management</a>
          </li>
        </ul>
      </div>
      <div>
        <div className="p-5 bg-base-100 rounded-sm mt-5">
          <div className="overflow-x-auto">
            <table className="table table-compact w-full">
              <thead>
                <tr>
                  <th></th>
                  <th>Apply Date</th>
                  <th>Days</th>
                  <th>Type</th>
                  <th>Status</th>
                  <th>Reason</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {leaves.map((myLeaves, idx) => (
                  <tr className="cursor-pointer">
                    <th>{idx + 1}</th>
                    <td>{myLeaves.date}</td>
                    <td>{myLeaves.days}</td>
                    <td>{myLeaves.type}</td>
                    <td>{myLeaves.status}</td>
                    <td>{myLeaves.reason}</td>
                    <td className="">
                      <label htmlFor="my-modal-3" className="">
                        <BiEdit
                          onClick={() => setLeave(myLeaves)}
                          className="text-primary text-2xl cursor-pointer"
                        />
                      </label>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {leave && <LeaveManagementModal leave={leave} />}
    </div>
  );
};

export default LeaveManagement;
