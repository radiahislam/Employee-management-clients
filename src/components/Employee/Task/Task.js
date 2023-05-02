import { useQuery } from "@tanstack/react-query";
import React from "react";

const Task = () => {
  const { data: task = [], isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/task/").then(
        (res) => res.json()
      ),
  });

  return (
    <div className="h-screen">
      <div>
        <div>
          <h1 className="text-4xl font-semibold">Tasks</h1>
          <div className="text-sm breadcrumbs">
            <ul className="text-lg">
              <li>
                <a>Dashboard</a>
              </li>
              <li>
                <a>Tasks</a>
              </li>
            </ul>
          </div>
        </div>
        <div>
          <div className=" bg-base-100 mt-5">
            <div className="overflow-x-auto p-4 rounded-sm">
              <table className="table w-full">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Project</th>
                    <th>Priority</th>
                    <th>Last date</th>
                    <th>Details</th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Task;
