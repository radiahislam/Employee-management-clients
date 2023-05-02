import { useQuery } from "@tanstack/react-query";
import React from "react";

const DashboardFeature = () => {
  const { data: task = [], isLoading } = useQuery({
    queryKey: ["task"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/task/").then(
        (res) => res.json()
      ),
  });

  return (
    <div>
      <div className=" bg-base-100 mt-5">
        <div className="overflow-x-auto p-4 rounded-sm">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th>Project</th>
                <th>Priority</th>
                <th>Last date</th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {task.map((tsk) => (
                <tr>
                  <th>{tsk?.title}</th>
                  <th className="text-warning">{tsk?.priority}</th>
                  <th>{tsk?.date}</th>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default DashboardFeature;
