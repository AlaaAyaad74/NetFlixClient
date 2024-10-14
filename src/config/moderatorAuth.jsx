import { Navigate } from "react-router-dom";
import PropTypes from "prop-types";

// Function to check if user is authenticated as a Moderator
const isModeratorAuthenticated = () => {
  try {
    const user = JSON.parse(localStorage.getItem("user"));
    return user && user.role === "moderator"; // Assuming 'role' is stored in user data
  } catch (error) {
    console.error("Failed to parse user from local storage:", error);
    return false;
  }
};

const ModeratorProtectedRoute = ({ element }) => {
  // Check if the user is authenticated as a Moderator
  return isModeratorAuthenticated() ? (
    <>{element}</>
  ) : (
    <Navigate to="/dashboard/login" replace />
  );
};
// Define prop types for the component
ModeratorProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired, // Ensure element is required
};

export default ModeratorProtectedRoute;
