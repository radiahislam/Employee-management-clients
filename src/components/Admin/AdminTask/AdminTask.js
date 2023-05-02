import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import { BsPlusCircleFill } from "react-icons/bs";
import { BiEdit } from "react-icons/bi";
import EditTask from "./EditTask";
import { MdDeleteForever } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import TaskModal from "./TaskModal";
const AdminTask = () => {
  const { register, handleSubmit, reset } = useForm();
  const [myTask, setMyTask] = useState(null);
  const onSubmit = (data) => {
    const title = data?.title;
    const priority = data?.priority;
    const date = data?.date;
    const details = data?.details;

    // ******************** POST Data on DBS start ************************

    axios
      .post("https://employee-management-server-sooty.vercel.app/task/", {
        title: title,
        priority: priority,
        date: date,
        details: details,
      })
      .then((response) => {
        console.log(response);
        toast.success("Task added successfully");
        reset();
        window.location.reload(true);
      })
      .catch((error) => {
        toast.error(error);
      });
    // ******************** POST Data on DBS end ************************
  };
  const { data: task = [], isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/task/").then(
        (res) => res.json()
      ),
  });

  // ************ Delete confirm *****************
  const deleteTask = (event) => {
    console.log(event._id);
    fetch(
      `https://employee-management-server-sooty.vercel.app/task/${event._id}`,
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
          <h1 className="text-4xl font-semibold">Tasks</h1>
          <h3 className="text-xl lg:block hidden mt-2">
            Dashboard
            <span className="text-gray-400 font-semibold">/Tasks</span>
          </h3>
        </div>

        <div>
          {/* Modal */}
          {/* The button to open modal */}
          <label htmlFor="my-modal-3" className="btn btn-primary">
            <BsPlusCircleFill className="mr-2" /> Add Task
          </label>

          {/* Put this part before </body> tag */}
          <input type="checkbox" id="my-modal-3" className="modal-toggle" />
          <div className="modal">
            <div className="modal-box relative">
              <label
                htmlFor="my-modal-3"
                className="btn btn-sm btn-circle absolute right-2 top-2"
              >
                ✕
              </label>
              <h3 className="text-lg font-bold mb-2">New Task</h3>
              {/* Modal for client add start */}

              <form onSubmit={handleSubmit(onSubmit)}>
                <input
                  {...register("title")}
                  type="text"
                  required
                  placeholder="Title"
                  className="input input-bordered w-full lg:mb-0 mb-2 mr-2"
                />

                <span className="lg:flex my-2">
                  <select
                    className="select select-bordered w-full lg:w-6/12 "
                    {...register("priority")}
                  >
                    <option selected>Priority</option>
                    <option>Low</option>
                    <option>Normal</option>
                    <option>High</option>
                  </select>
                  <input
                    {...register("date")}
                    type="date"
                    required
                    placeholder="date"
                    className="input input-bordered w-full lg:ml-2"
                  />
                </span>

                <textarea
                  {...register("details")}
                  className="textarea textarea-bordered w-full"
                  placeholder="Event Details"
                ></textarea>

                <div className="modal-action mb-2">
                  <input
                    htmlFor="my-modal-3"
                    className="btn btn-primary"
                    type="submit"
                  />
                </div>
              </form>

              {/* Modal for client add end*/}
            </div>
          </div>

          {/* Modal */}
        </div>
      </div>
      <div className=" bg-base-100 mt-5">
        <div className="overflow-x-auto p-4">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Project</th>
                <th>Priority</th>
                <th>Last date</th>
                <th>Details</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {task.map((tsk, idx) => (
                <tr>
                  <th>{idx + 1}</th>
                  <th>{tsk?.title}</th>
                  <th className="text-warning">{tsk?.priority}</th>

                  <th>{tsk?.date}</th>

                  <th>{tsk?.details}</th>
                  <th className="flex justify-evenly">
                    <label htmlFor="task-edit" className="">
                      <BiEdit
                        onClick={() => setMyTask(tsk)}
                        className="text-primary text-2xl cursor-pointer"
                      />
                    </label>
                    <label htmlFor="my-modal" className="cursor-pointer">
                      <RiDeleteBin6Line
                        onClick={() => setMyTask(tsk)}
                        className="text-2xl text-red-500 hover:text-red-700"
                      />
                    </label>
                  </th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {myTask && <EditTask key={myTask._id} myTask={myTask} />}
      {myTask && (
        <TaskModal key={myTask._id} myTask={myTask} deleteTask={deleteTask} />
      )}
    </div>
  );
};

export default AdminTask;
