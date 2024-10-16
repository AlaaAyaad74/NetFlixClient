import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Function to check if the user is authenticated and has the correct role
const isAuthenticatedWithRole = (roles = []) => {
  try {
    // Parse the user data from localStorage
    const user = JSON.parse(localStorage.getItem("decodedToken"));
    
    // Ensure that both user and roles exist and are valid
    if (user && user.role && Array.isArray(roles)) {
 
      // Check if the user's role is included in the allowed roles
      return roles.includes(user.role);
    }
    return false;
  } catch (error) {
    console.error("Failed to parse user from local storage:", error);
    return false;
  }
};

// Protected route component for checking roles
const ProtectedDashboardRoute = ({ element, allowedRoles }) => {
  // Check if the user has any of the allowed roles
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
