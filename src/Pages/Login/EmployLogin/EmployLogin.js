import React, { useContext, useState } from "react";
import bgImage from "../../../assets/Image/bg.png";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { BeatLoader } from "react-spinners";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../contexts/AuthProvider";
const EmployLogin = () => {
  const { user, loading, signIn } = useContext(AuthContext);
  let navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/employeesMain/mainDashboard";

  console.log(user?.email);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    signIn(email, password)
      .then((result) => {
        console.log(result);
        navigate(from, { replace: true });
        toast.success("Successfully Login");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  if (user) {
    navigate("/employeesMain/mainDashboard");
  }
  return (
    <div className="h-screen flex items-center justify-center">
      <div data-theme="light" className="hero min-h-screen ">
        <div className="hero-content  flex-col-reverse lg:flex-row-reverse">
          <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
            <div className="card-body">
              <span className="mx-auto">
                <Link to="/adminLogin" className="btn btn-sm mr-4">
                  Admin
                </Link>
                <Link to="/employLogin" className="btn btn-sm mr-4">
                  Employ
                </Link>
              </span>
              <h1 className="text-center text-xl font-medium">Employ Portal</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">User Email</span>
                  </label>
                  <input
                    {...register("email", {
                      required: "Email Address is required !",
                      pattern: {
                        value: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
                        message: "Enter the valid email",
                      },
                    })}
                    type="text"
                    placeholder="email"
                    className="input input-bordered"
                  />
                </div>
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Password</span>
                  </label>
                  <input
                    {...register("password", {
                      required: true,
                    })}
                    type="password"
                    placeholder="password"
                    className="input input-bordered"
                  />
                </div>
                {errors.email && (
                  <p className="mt-2 text-sm text-red-600" role="alert">
                    {errors.email?.message}
                  </p>
                )}
                <div className="flex justify-center mt-2">
                  {loading && <BeatLoader color="#7736d6" />}
                </div>
                <div className="form-control mt-6">
                  <input
                    className="btn btn-primary"
                    value="Log in"
                    type="submit"
                  />
                </div>
              </form>
            </div>
          </div>
          <div>
            <img className="lg:max-w-xl w-auto" src={bgImage} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployLogin;
