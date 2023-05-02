import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";

const Leaves = () => {
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

    // ******************** POST Data on DBS start ************************

    axios
      .post("https://employee-management-server-sooty.vercel.app/leaves", {
        email: email,
        date: date,
        days: days,
        type: type,
        status: status,
        reason: reason,
      })
      .then((response) => {
        console.log(response);
        toast.success("Leaves Added successfully");
        reset();
        window.location.reload(true);
      })
      .catch((error) => {
        console.log(error);
      });
    // ******************** POST Data on DBS end ************************
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
          <h3 className="text-lg font-bold">New Leave Request</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <span className="flex my-2">
              <input
                {...register("date")}
                type="date"
                placeholder="Type here"
                className="input input-bordered w-full max-w-xs"
              />
              <input
                {...register("days")}
                type="text"
                placeholder="Days"
                required
                className="input input-bordered w-full max-w-xs ml-2"
              />
            </span>
            <span className="flex">
              <select
                className="select select-bordered w-full lg:w-6/12"
                {...register("type")}
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
                <option disabled>Approved</option>
                <option disabled>Rejected</option>
                <option>Pending</option>
              </select>
            </span>
            <textarea
              {...register("reason")}
              className="textarea textarea-bordered mt-2 w-full"
              placeholder="Reason"
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

export default Leaves;
