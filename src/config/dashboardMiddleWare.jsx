import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Function to check if the user is authenticated and has the correct role
const isAuthenticatedWithRole = (roles = []) => {
  try {
    // Get the token and user data from localStorage
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("decodedToken"));
    
    // Ensure that both token and user exist
    if (token && user && user.role && Array.isArray(roles)) {
      // Check if the user's role is included in the allowed roles
      return roles.includes(user.role);
    }
    return false; // Return false if token or user doesn't exist
  } catch (error) {
    console.error("Failed to parse user from local storage:", error);
    return false;
  }
};

// Protected route component for checking roles and token
const ProtectedDashboardRoute = ({ element, allowedRoles }) => {
  // Check if the user has the allowed roles and a valid token
  return isAuthenticatedWithRole(allowedRoles) ? (
    <>{element}</>
  ) : (
    <Navigate to="/login" replace />
  );
};

// Define prop types for the component
ProtectedDashboardRoute.propTypes = {
  element: PropTypes.element.isRequired, // Ensure the element is passed
  allowedRoles: PropTypes.arrayOf(PropTypes.string).isRequired, // Ensure allowedRoles is an array of strings
};

export default ProtectedDashboardRoute;
