import React, { useContext, useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { AuthContext } from "../../../contexts/AuthProvider";
import Leaves from "./Leaves";
import { useQuery } from "@tanstack/react-query";
import { PuffLoader } from "react-spinners";
import { RiDeleteBin5Line } from "react-icons/ri";
import ModalLeaves from "./ModalLeaves";
import { Toaster, toast } from "react-hot-toast";

const MyLeaves = () => {
  const { user } = useContext(AuthContext);
  const [leavesDb, setLeaveDb] = useState(null);

  // ******************* Load Data start *******************

  const { data: leaves = [], isLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: () =>
      fetch(
        `https://employee-management-server-sooty.vercel.app/leaves?email=${user?.email}`
      ).then((res) => res.json()),
  });

  // ******************* Load Data End *********************

  // ************ Delete confirm *****************
  const deleteLeaves = (event) => {
    fetch(
      `https://employee-management-server-sooty.vercel.app/leaves/${event._id}`,
      {
        method: "DELETE",
      }
    );
    if (event) {
      toast.success("Delete successfully");
      window.location.reload(true);
    }
  };
  // ************ Delete confirm *****************

  return (
    <div className="h-screen">
      <Toaster />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold">My Leaves</h1>
          <h3 className="text-xl lg:block hidden mt-2">
            Dashboard
            <span className="text-gray-400 font-semibold">/My Leaves</span>
          </h3>
        </div>
        <div>
          {/* The button to open modal */}
          <label htmlFor="my-modal-3" className="btn btn-primary btn-circle">
            <BsPlusCircleFill className="text-xl" />
          </label>
        </div>
      </div>
      <Leaves />

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
            <span className="flex justify-center">
              {isLoading && <PuffLoader color="#8858e1" />}
            </span>
            <tbody>
              {leaves.map((myLeaves, idx) => (
                <tr className="cursor-pointer">
                  <th>{idx + 1}</th>
                  <td>{myLeaves.date}</td>
                  <td>{myLeaves.days}</td>
                  <td>{myLeaves.type}</td>
                  <td>{myLeaves.status}</td>
                  <td>{myLeaves.reason}</td>
                  <td className="flex justify-center items-center">
                    {" "}
                    <a href="#my-modal-2" className="btn">
                      <RiDeleteBin5Line
                        onClick={() => setLeaveDb(myLeaves)}
                        className="text-xl text-red-500 font-semibold cursor-pointer"
                      />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {leavesDb && (
        <ModalLeaves leavesDb={leavesDb} deleteLeaves={deleteLeaves} />
      )}
    </div>
  );
};

export default MyLeaves;
