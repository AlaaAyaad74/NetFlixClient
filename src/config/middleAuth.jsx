import { Navigate } from "react-router-dom";
import PropType from "prop-types";

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("authToken");

  // If the user is authenticated, allow access to the route
  return isAuthenticated ? element : <Navigate to="/login" replace />;
};

ProtectedRoute.propTypes = {
  element: PropType.element,
};

export default ProtectedRoute;
