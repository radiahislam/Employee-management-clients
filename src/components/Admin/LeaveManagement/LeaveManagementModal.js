import axios from "axios";
import React, { useContext } from "react";
import { Toaster, toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
import { useForm } from "react-hook-form";

const LeaveManagementModal = ({ leave }) => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  //   *********************** Form section start ***************************
  const onSubmit = (data) => {
    const email = user?.email;
    const date = data?.date;
    const days = data?.days;
    const type = data?.type;
    const status = data?.status;
    const reason = data?.reason;

    // ******************** Update Data on DBS start ************************

    fetch(
      `https://employee-management-server-sooty.vercel.app/leaves/${leave._id}`,
      {
        method: "PUT",
        body: JSON.stringify({
          email: email,
          date: date,
          days: days,
          type: type,
          status: status,
          reason: reason,
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      }
    )
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        toast.success("Update successfully");
      });

    // ******************** Update Data on DBS end ************************
    console.log(email, date, days, type, status, reason);
  };
  //   *********************** Form section end ***************************

  return (
    <div>
      <Toaster />
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
          <h3 className="text-lg font-bold">Leave Request</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="flex my-2">
              <input
                {...register("date")}
                type="date"
                placeholder="Type here"
                value={leave?.data}
                className="input input-bordered w-full max-w-xs"
              />
              <input
                {...register("days")}
                type="text"
                placeholder="Days"
                value={leave?.days}
                required
                className="input input-bordered w-full max-w-xs ml-2"
              />
            </span>
            <span className="flex">
              <select
                className="select select-bordered w-full lg:w-6/12"
                {...register("type")}
                value={leave?.type}
              >
                <option disabled selected>
                  Type*
                </option>
                <option>Casual Leave</option>
                <option>Sick Leave</option>
                <option>Privilege Leave</option>
                <option>Marriage Leave</option>
                <option>Maternity Leave</option>
              </select>
              <select
                className="select select-bordered w-full ml-2 lg:w-6/12"
                {...register("status")}
              >
                <option selected>Status*</option>
                <option>Approved</option>
                <option>Rejected</option>
                <option>Pending</option>
              </select>
            </span>
            <textarea
              {...register("reason")}
              className="textarea textarea-bordered mt-2 w-full"
              placeholder="Reason"
              value={leave?.reason}
            ></textarea>

            <div className="modal-action">
              <input
                htmlFor="my-modal-3"
                className="btn btn-primary"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeaveManagementModal;
