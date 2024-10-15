import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import Layout from "../coponents/dashboardComponents/Layout/Layout";
const AuthLogin = lazy(() =>
  import("../pages/DashboardView/Authintecation/Login")
);
const AuthSignup = lazy(() =>
  import("../pages/DashboardView/Authintecation/SignUp")
);
const Dashboard = lazy(() =>
  import("../pages/DashboardView/Dashboard/Dashboard")
);
const Calendar = lazy(() => import("../pages/DashboardView/Calendar/Calendar"));
const BoardPage = lazy(() => import("../pages/DashboardView/Board/Board"));
const DataGrid = lazy(() => import("../pages/DashboardView/DataGrid/DataGrid"));

import "./dashboardRoutesCSS.css";

const DashboardRoutes = () => {
  return (
    <div id="dashboard">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<AuthLogin />} />
          <Route path="/signUp" element={<AuthSignup />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="board" element={<BoardPage />} />
          <Route path="users" element={<DataGrid />} />
      
        </Route>
      </Routes>
    </div>
  );
};

export default DashboardRoutes;
