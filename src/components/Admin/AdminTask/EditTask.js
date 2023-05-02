import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";

const EditTask = ({ myTask }) => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    const title = data?.title;
    const priority = data?.priority;
    const date = data?.date;
    const details = data?.details;
    console.log(myTask._id);

    // ******************** POST Data on DBS start ************************

    fetch(
      `https://employee-management-server-sooty.vercel.app/task/${myTask._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          title: title,
          priority: priority,
          date: date,
          details: details,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        toast.success("Task Update");
        window.location.reload(true);
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

  return (
    <div>
      <Toaster />
      {/* Put this part before </body> tag */}
      <input type="checkbox" id="task-edit" className="modal-toggle" />
      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="task-edit"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <h3 className="text-lg font-bold mb-2">Edit Task</h3>
          {/* Modal for client add start */}

          <form onSubmit={handleSubmit(onSubmit)}>
            <span>
              <input
                {...register("title")}
                type="text"
                required
                placeholder={myTask.title}
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
                  placeholder={myTask.date}
                  className="input input-bordered w-full lg:ml-2"
                />
              </span>

              <textarea
                {...register("details")}
                className="textarea textarea-bordered w-full"
                placeholder={myTask.details}
              ></textarea>
            </span>
            <div className="modal-action mb-2">
              <input
                htmlFor="task-edit"
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
  );
};

export default EditTask;
