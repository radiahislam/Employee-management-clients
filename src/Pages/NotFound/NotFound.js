import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  if (user) {
    navigate("/dashboard");
  }
  console.log(window.location.hostname);
  return (
    <div className="h-screen flex items-center justify-center">
      <main class="grid min-h-full place-items-center  px-6 py-24 sm:py-32 lg:px-8">
        <div class="text-center">
          <p class="text-4xl font-semibold text-indigo-600">404</p>
          <h1 class="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Page not found
          </h1>
          <p class="mt-6 text-base leading-7 text-gray-600">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
        </div>
      </main>
    </div>
  );
};

export default NotFound;
