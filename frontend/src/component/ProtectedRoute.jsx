import React from "react";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {

  const isAuthenticated = localStorage.getItem("token");
  console.log("isAuthenticated:", isAuthenticated); 

  return isAuthenticated ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
