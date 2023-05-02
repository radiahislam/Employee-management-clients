import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";

const AddEmployees = () => {
  //   *************** Firebase hook *******************
  const { createUser } = useContext(AuthContext);
  const [signUpError, setSignUPError] = useState("");

  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  //   *************** Firebase hook *******************

  // ****************** Employees ADD start **********************

  const onSubmit = (data) => {
    const name = data.Name;
    const email = data.Email;
    const password = data.Password;
    const phoneNumber = data.phoneNumber;
    const Department = data.Department;
    const Role = data.Role;

    // ** FIREBASE
    createUser(email, password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("Employees added successfully");
        setSignUPError("");
        // ************ Client Image upload start ****************************
        const image = data.clientPhoto[0];
        const formData = new FormData();
        formData.append("image", image);
        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
        fetch(url, {
          method: "POST",
          body: formData,
        })
          .then((res) => res.json())
          // ************ Client Image upload end ****************************
          .then((imgData) => {
            if (imgData.data) {
              // ******************** POST Data on DBS start ************************
              axios
                .post(
                  "https://employee-management-server-sooty.vercel.app/users",
                  {
                    name: name,
                    email: email,
                    phoneNumber: phoneNumber,
                    department: Department,
                    role: Role,
                    image: imgData.data.url,
                  }
                )
                .then((response) => {
                  console.log(response);
                  reset();
                })
                .catch((error) => {
                  console.log(error);
                });
              // ******************** POST Data on DBS end ************************
            }
          });
      })
      .catch((error) => {
        setSignUPError(error?.message);
        // ..
      });
    // ** FIREBASE
  };

  return (
    <div className="h-screen">
      <Toaster />
      <div className="mb-2">
        <Link
          to="/employees"
          className="underline underline-offset-1 text-primary font-semibold"
        >
          Back
        </Link>
      </div>
      <div className="bg-base-100 p-8 rounded-md ">
        <h1 className="mb-5 text-lg font-semibold">Add Employee</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <span className="lg:flex">
            <input
              {...register("Name")}
              type="text"
              required
              placeholder="Name*"
              className="input input-bordered w-full lg:mb-0 mb-2 mr-2"
            />
            <input
              {...register("Email")}
              type="email"
              required
              placeholder="Email*"
              className="input input-bordered w-full lg:mb-0 mr-2 mb-2"
            />
            <input
              {...register("Password")}
              type="password"
              required
              placeholder="Password*"
              className="input input-bordered w-full lg:mb-0 mb-2"
            />
          </span>
          <span className="lg:flex lg:my-4">
            <input
              {...register("phoneNumber")}
              type="text"
              required
              placeholder="Mobile*"
              className="input input-bordered lg:w-4/12  w-full mr-2"
            />
            <select
              className="select select-bordered lg:w-4/12 mr-2 w-full my-2 lg:my-0"
              {...register("Department")}
              required
            >
              <option disabled selected>
                Department
              </option>
              <option>Admin</option>
              <option>React js</option>
              <option>Java</option>
              <option>Design</option>
              <option>Marketing</option>
              <option>Accounting</option>
              <option>Developing</option>
              <option>Testing</option>
            </select>

            <select
              className="select select-bordered lg:w-4/12  w-full"
              {...register("Role")}
              required
            >
              <option disabled selected>
                Role
              </option>
              <option>Admin</option>
              <option>Developer</option>
              <option>Leader</option>
              <option>Manager</option>
              <option>Designer</option>
              <option>Tester</option>
            </select>
          </span>
          <span className="">
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Upload Image</span>
              </label>
              <input
                {...register("clientPhoto")}
                type="file"
                required
                className="file-input file-input-bordered file-input-primary w-full"
              />
            </div>
          </span>
          <span>
            <p className="text-sm text-error ml-2 mt-2">{signUpError}</p>
          </span>
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
  );
};

export default AddEmployees;
