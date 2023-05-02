import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { Toaster, toast } from "react-hot-toast";
import ConfirmationModal from "./ConfirmationModal";
const Employees = () => {
  const [deletingEmployees, setDeletingEmployees] = useState(null);
  // ************ Delete confirm *****************
  const deleteUsers = (event) => {
    fetch(
      `https://employee-management-server-sooty.vercel.app/users/${event._id}`,
      {
        method: "DELETE",
      }
    );
    if (event) {
      window.location.reload(true);
      toast.success("Delete successfully");
    }
  };
  // ************ Delete confirm *****************

  // ******************* Load Data start *******************

  const { data: users = [], isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/users").then(
        (res) => res.json()
      ),
  });
  // ******************* Load Data End *********************

  return (
    <div className="h-screen">
      <Toaster />
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-semibold">Employee</h1>
          <h3 className="text-xl lg:block hidden mt-2">
            Dashboard
            <span className="text-gray-400 font-semibold">/Employee</span>{" "}
          </h3>
        </div>
        <div>
          <Link to="/addEmployees" className="btn btn-primary">
            Add <BsPlusCircleFill className="ml-2" />
          </Link>
        </div>
      </div>

      <div>
        {isLoading && (
          <span className="flex items-center justify-center h-screen">
            <ClipLoader color="#5620da" />
          </span>
        )}
        {/* All Clients start */}
        <div className="overflow-x-auto bg-base-100 p-5 mt-2 rounded-sm">
          <table className="table table-zebra w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Image</th>
                <th>Name</th>
                <th>Department</th>
                <th>Role</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {users?.map((user, idx) => (
                <tr>
                  <th>{idx + 1}</th>
                  <td className="">
                    <img
                      className="w-14 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                      src={user.image}
                      alt=""
                    />
                  </td>
                  <td>{user.name}</td>
                  <td>{user.department}</td>
                  <td>{user.role}</td>
                  <td>{user.phoneNumber}</td>
                  <td>{user.email}</td>
                  <td>
                    {" "}
                    <div className="card-actions justify-end">
                      {/* The button to open modal */}
                      <label
                        onClick={() => setDeletingEmployees(user)}
                        htmlFor="my-modal"
                        className="cursor-pointer btn btn-sm btn-error"
                      >
                        Delete
                      </label>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {deletingEmployees && (
          <ConfirmationModal
            deletingEmployees={deletingEmployees}
            deleteUsers={deleteUsers}
          />
        )}
        {/* All Clients end */}
      </div>
    </div>
  );
};

export default Employees;
