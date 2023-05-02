import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../contexts/AuthProvider";
import { FadeLoader, RiseLoader } from "react-spinners";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  let location = useLocation();
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <RiseLoader color="#3936d6" />
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to="/adminLogin" state={{ from: location }} replace />;
};

export default PrivateRoute;
