import React, { useState } from "react";
import { BsPlusCircleFill } from "react-icons/bs";
import { useForm } from "react-hook-form";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { ClipLoader } from "react-spinners";
import Client from "./Client";
import { MdDeleteForever } from "react-icons/md";

const Clients = () => {
  const { register, handleSubmit, reset } = useForm();
  const imageHostKey = process.env.REACT_APP_imgbb_key;
  const [clientId, setClientId] = useState(null);

  const onSubmit = (data) => {
    /*********  Client data input start **************/

    const name = data.Name;
    const companyName = data.companyName;
    const email = data.email;
    const phoneNumber = data.phoneNumber;
    /**************  Client data input end ******************/

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
              "https://employee-management-server-sooty.vercel.app/clients",
              {
                name: name,
                companyName: companyName,
                email: email,
                phoneNumber: phoneNumber,
                image: imgData.data.url,
              }
            )
            .then((response) => {
              console.log(response);
              toast.success("Client added successfully");
              reset();
              window.location.reload(true);
            })
            .catch((error) => {
              console.log(error);
            });
          // ******************** POST Data on DBS end ************************
        }
      });
  };

  // ******************* Load Data start *******************

  const { data: clients = [], isLoading } = useQuery({
    queryKey: ["clients"],
    queryFn: () =>
      fetch("https://employee-management-server-sooty.vercel.app/clients").then(
        (res) => res.json()
      ),
  });

  // ******************* Load Data End *********************

  // ************ Delete confirm *****************
  const deleteClient = (event) => {
    fetch(
      `https://employee-management-server-sooty.vercel.app/clients/${event._id}`,
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
    <div className="bg-base-200 h-screen">
      <Toaster />
      <div className="flex justify-between">
        <div>
          <h1 className="text-4xl font-semibold">Clients</h1>
          <h3 className="text-xl lg:block hidden mt-2">
            Dashboard
            <span className="text-gray-400 font-semibold">/Clients</span>{" "}
          </h3>
        </div>
        <div>
          {/* Modal */}
          {/* The button to open modal */}
          <label htmlFor="my-modal-3" className="btn btn-primary">
            <BsPlusCircleFill className="mr-2" /> Add Client
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
              <h3 className="text-lg font-bold">Add Client</h3>
              {/* Modal for client add start */}

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
                    {...register("companyName")}
                    type="text"
                    required
                    placeholder="Company Name*"
                    className="input input-bordered w-full lg:mb-0 mb-2"
                  />
                </span>
                <span className="lg:flex lg:my-4">
                  <input
                    {...register("email")}
                    type="email"
                    required
                    placeholder="Email*"
                    className="input input-bordered w-full lg:mb-0 mb-2 mr-2"
                  />
                  <input
                    {...register("phoneNumber")}
                    type="text"
                    required
                    placeholder="Mobile*"
                    className="input input-bordered w-full"
                  />
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

                <div className="modal-action">
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
      {isLoading && (
        <span className="flex items-center justify-center h-screen">
          <ClipLoader color="#5620da" />
        </span>
      )}

      {/* All Clients start */}
      <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 my-9 z-0">
        {clients?.map((client) => (
          <div className="card rounded-md card-compact w-full bg-base-100 shadow-xl ">
            <figure>
              <div className="avatar">
                <div className="w-24 rounded-full mt-4">
                  <img src={client.image} alt="Client img" />
                </div>
              </div>
            </figure>
            <div className="card-body text-center">
              <h2 className="font-semibold text-xl">{client.companyName}</h2>
              <h2 className="font-medium text-sm">{client.name}</h2>
              <p className="text-sm text-gray-400">
                Email:{" "}
                <span className="text-blue-600 font-medium cursor-pointer text-base underline underline-offset-1">
                  {client.email}
                </span>
              </p>
              <p className="text-sm text-gray-400">
                Phone: {client.phoneNumber}
              </p>
              <div className="card-actions justify-end">
                {/* The button to open modal */}
                <label
                  onClick={() => setClientId(client)}
                  htmlFor="my-modal"
                  className="cursor-pointer"
                >
                  <MdDeleteForever className="text-2xl text-red-500 hover:text-red-700" />
                </label>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* All Clients end */}
      {clientId && <Client clientId={clientId} deleteClient={deleteClient} />}
    </div>
  );
};

export default Clients;
