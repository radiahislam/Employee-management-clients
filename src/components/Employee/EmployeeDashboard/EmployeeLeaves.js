import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../../contexts/AuthProvider";
import { PuffLoader } from "react-spinners";
const EmployeeLeaves = () => {
  const { user } = useContext(AuthContext);
  // ******************* Load Data start *******************

  const { data: leaves = [], isLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: () =>
      fetch(
        `https://employee-management-server-sooty.vercel.app/leaves?email=${user?.email}`
      ).then((res) => res.json()),
  });

  // ******************* Load Data End *********************
  return (
    <div className="p-5 bg-base-100 rounded-sm mt-5">
      <div className="overflow-x-auto">
        <table className="table table-compact w-full">
          <thead>
            <tr>
              <th>Apply Date</th>
              <th>Days</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <span className="flex justify-center">
            {isLoading && <PuffLoader color="#8858e1" />}
          </span>
          <tbody>
            {leaves.map((myLeaves, idx) => (
              <tr className="cursor-pointer">
                <td>{myLeaves.date}</td>
                <td>{myLeaves.days}</td>
                <td>{myLeaves.type}</td>
                <td>{myLeaves.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeLeaves;
