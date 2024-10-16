import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "../coponents/dashboardComponents/Layout/Layout";
import ProtectedRoute from "../config/dashboardMiddleWare"; // Import the middleware

// Lazy load the components
 
const Dashboard = lazy(() =>
  import("../pages/DashboardView/Dashboard/Dashboard")
);
const Calendar = lazy(() => import("../pages/DashboardView/Calendar/Calendar"));
const BoardPage = lazy(() => import("../pages/DashboardView/Board/Board"));
const DataGrid = lazy(() => import("../pages/DashboardView/DataGrid/DataGrid"));
const MoviesGrid = lazy(() => import("../pages/DashboardView/moderator/movieGrid/MoviesGrid"));
const AddMovie = lazy(() =>
  import("../pages/DashboardView/moderator/AddMoview")
);
const ModeratorDashboard = lazy(() =>
  import("../pages/DashboardView/moderator/ModeratorDashboard"));
const UploadContent = lazy(() =>
  import("../pages/DashboardView/moderator/uploadMovieVideo"));
import "./dashboardRoutesCSS.css";

const DashboardRoutes = () => {
  return (
    <div id="dashboard">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
   
          <Route path="calendar" element={<Calendar />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="users" element={<DataGrid />} />
          <Route path="movies" element={<MoviesGrid />} />

          {/* Protect Moderator routes */}
          <Route 
            path="moderator" 
            element={
              <ProtectedRoute element={<ModeratorDashboard />} allowedRoles={["movieModerator"]} />
            } 
          />
          <Route 
            path="add-movie" 
            element={
              <ProtectedRoute element={<AddMovie />} allowedRoles={["movieModerator"]} />
            } 
          />
          <Route 
            path="upload-content/:movieId" 
            element={
              <ProtectedRoute element={<UploadContent />} allowedRoles={["movieModerator"]} />
            } 
          />

          {/* Protect usersAdmin routes */}
          <Route 
            path="users" 
            element={
              <ProtectedRoute element={<DataGrid />} allowedRoles={["usersAdmin"]} />
            } 
          />
        </Route>
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
