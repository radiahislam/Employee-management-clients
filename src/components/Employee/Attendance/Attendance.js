import moment from "moment/moment";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../../contexts/AuthProvider";
import axios from "axios";
import { Toaster, toast } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

const Attendance = () => {
  const { user } = useContext(AuthContext);
  const { register, handleSubmit, reset } = useForm();
  // State for storing employee attendance data
  const [attendanceData, setAttendanceData] = useState([]);
  // State for capturing form data
  const [formData, setFormData] = useState({
    date: "",
    checkIn: "",
    breakTime: "",
    checkOut: "",
  });

  // Function to handle form data change
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle attendance marking
  const markAttendance = () => {
    if (formData.date && formData.checkIn && formData.checkOut) {
      const newAttendance = {
        id: attendanceData.length + 1,
        date: formData.date,
        checkIn: formData.checkIn,
        breakTime: formData.breakTime,
        checkOut: formData.checkOut,
      };
      setAttendanceData([...attendanceData, newAttendance]);
      setFormData({
        date: "",
        checkIn: "",
        breakTime: "",
        checkOut: "",
      });
    }
  };

  // Function to calculate total work hours
  const calculateTotalHours = (checkIn, checkOut, breakTime) => {
    const checkInTime = new Date(checkIn);
    const checkOutTime = new Date(checkOut);
    const breakTimeHours = breakTime ? parseFloat(breakTime) : 0;
    const totalHours =
      (checkOutTime - checkInTime) / 1000 / 60 / 60 - breakTimeHours;
    return totalHours.toFixed(2);
  };

  const onSubmit = (data) => {
    console.log(data);
    const email = user?.email;
    const date = data?.date;
    const breakTime = data?.breakTime;
    const checkIn = data?.checkIn;
    const checkOut = data?.checkOut;

    const oldDate = localStorage.getItem("date");

    // ******************** POST Data on DBS start ************************

    if (oldDate === date) {
      toast.error("Your attendance is already done");
    } else {
      localStorage.setItem("date", date);
      axios
        .post(
          "https://employee-management-server-sooty.vercel.app/attendance",
          {
            email: email,
            date: date,
            breakTime: breakTime,
            checkIn: checkIn,
            checkOut: checkOut,
          }
        )
        .then((response) => {
          console.log(response);
          toast.success("Client added successfully");
          reset();
          //   window.location.reload(true);
        })
        .catch((error) => {
          console.log(error);
        });
      // ******************** POST Data on DBS end ************************
    }
  };

  // ******************* Load Data start *******************

  const { data: attendance = [], isLoading } = useQuery({
    queryKey: ["leaves"],
    queryFn: () =>
      fetch(
        `https://employee-management-server-sooty.vercel.app/attendance?email=${user?.email}`
      ).then((res) => res.json()),
  });

  // ******************* Load Data End *********************
  console.log(user?.email);
  return (
    <div className="h-screen">
      <Toaster />
      <div className="text-sm breadcrumbs">
        <h1 className="text-4xl font-semibold">Attendance</h1>
        <ul className="text-lg">
          <li>
            <a>Dashboard</a>
          </li>
          <li>
            <a>Attendance</a>
          </li>
        </ul>
      </div>
      <div className="bg-base-100 p-4 rounded">
        <div className="container mx-auto p-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4 lg:flex">
              <span className="lg:mr-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Date</span>
                  </label>
                  <input
                    {...register("date")}
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleFormChange}
                    className="input input-bordered w-full max-w-xs mb-2"
                  />
                </div>
              </span>
              <span className="lg:mr-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Check-in</span>
                  </label>
                  <input
                    {...register("checkIn")}
                    type="time"
                    name="checkIn"
                    value={formData.checkIn}
                    onChange={handleFormChange}
                    className="input input-bordered w-full max-w-xs mb-2"
                  />
                </div>
              </span>
              <span className="lg:mr-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Break (hrs)</span>
                  </label>
                  <input
                    {...register("breakTime")}
                    type="number"
                    name="breakTime"
                    value={formData.breakTime}
                    onChange={handleFormChange}
                    className="input input-bordered w-full max-w-xs mb-2"
                  />
                </div>
              </span>
              <span className="lg:mr-2">
                <div className="form-control w-full max-w-xs">
                  <label className="label">
                    <span className="label-text">Check-out</span>
                  </label>
                  <input
                    {...register("checkOut")}
                    type="time"
                    name="checkOut"
                    value={formData.checkOut}
                    onChange={handleFormChange}
                    className="input input-bordered w-full max-w-xs mb-2"
                  />
                </div>
              </span>
            </div>
            <input
              htmlFor="my-modal-3"
              className="btn btn-primary"
              type="submit"
            />
          </form>
          <div>
            <div className="overflow-x-auto mt-5">
              <table className="table table-compact w-full">
                <thead>
                  <tr>
                    <th></th>
                    <th>Date</th>
                    <th>Check-in</th>
                    <th>Break (hrs)</th>
                    <th>Check-out</th>
                    <th>Status</th>
                  </tr>
                </thead>
                {attendance.map((employee, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{employee.date}</td>
                    <td>{employee.checkIn}</td>
                    <td>
                      {employee.breakTime ? `${employee.breakTime} hrs` : "N/A"}
                    </td>
                    <td>{employee.checkOut}</td>

                    <td>
                      {employee.checkIn && employee.checkOut
                        ? "Present"
                        : "Absent"}
                    </td>
                  </tr>
                ))}
              </table>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse table-auto">
              {/* <thead>
                <tr>
                  <th className="py-3 px-4 font-semibold text-left">Date</th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Check-in
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Break (hrs)
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Check-out
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">
                    Hours Worked
                  </th>
                  <th className="py-3 px-4 font-semibold text-left">Status</th>
                </tr>
              </thead> */}
              {/* <tbody>
                {attendance.map((employee) => (
                  <tr key={employee.id}>
                    <td className="py-3 px-4">{employee.date}</td>
                    <td className="py-3 px-4">{employee.checkIn}</td>
                    <td className="py-3 px-4">
                      {employee.breakTime ? `${employee.breakTime} hrs` : "N/A"}
                    </td>
                    <td className="py-3 px-4">{employee.checkOut}</td>
                    <td className="py-3 px-4">
                      {employee.checkIn && employee.checkOut
                        ? calculateTotalHours(
                            employee.checkIn,
                            employee.checkOut,
                            employee.breakTime
                          )
                        : "N/A"}{" "}
                      hrs
                    </td>
                    <td className="py-3 px-4">
                      {employee.checkIn && employee.checkOut
                        ? "Present"
                        : "Absent"}
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
