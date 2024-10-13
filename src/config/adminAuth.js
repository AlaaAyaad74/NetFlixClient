import React from "react";
import { Navigate } from "react-router-dom";

// Function to check if user is authenticated as an Admin
const isAdminAuthenticated = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user && user.role === "admin"; // Assuming 'role' is stored in user data
};

const AdminProtectedRoute = ({ element }) => {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/auth/login" />;
  }
  return element;
};

export default AdminProtectedRoute;
