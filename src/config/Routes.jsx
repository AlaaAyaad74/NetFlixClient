import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleAuth";
import DashboardRoutes from "./DashboardRoutes";
import ProtectedDashboardRoute from "../config/dashboardMiddleWare"; // Import the middleware

// Lazy-load Components
const LandingPage = lazy(() => import("../pages/LandingPage"));
const ErrorPage = lazy(() =>
  import("../coponents/utilitiesCpmponents/errorPage/ErrorPage")
);
const HomePage = lazy(() => import("../pages/Home"));
const Details = lazy(() => import("../pages/details/Details"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const Catalog = lazy(() => import("../pages/Catalog"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const EpisodeDetailPage = lazy(() => import("../pages/EpisodeDetailPage"));
const Player = lazy(() =>
  import("../coponents/utilitiesCpmponents/Player/Player")
);
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const Profile = lazy(() => import("../pages/Profile/Profile"));


const ForgetPassword = lazy(() => import("../pages/Profile/ForgetPassword"));
const ResetPassword = lazy(() => import("../pages/Profile/ResetPassword"));
const CardDetails = lazy(() => import("../pages/CardDetails"));

const dummyEpisodes = [
  {
    videoSrc: "https://res.cloudinary.com/episode1.mp4",
    title: "Episode 1: The Beginning",
    description: "In this episode, we explore the origins of the story.",
    image: "/1.jpg",
  },
];

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/landing" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/forgot-password" element={<ForgetPassword />} /> 
      <Route path="/reset-password/:token" element={<ResetPassword />} />
      <Route path="/CardDetails" element={<CardDetails />} />

      {/* Moderator Routes */}

      <Route
        path="/dashboard/*"
        element={
          <ProtectedDashboardRoute
            element={<DashboardRoutes />}
            allowedRoles={[
              "usersAdmin", 
              "moderatorAdmin", 
              "movieModerator", 
              "seriesModerator", 
              "tvShowModerator"
            ]}
          />
        }
      />
      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      <Route
        path="/search"
        element={<ProtectedRoute element={<SearchPage />} />}
      />
      <Route
        path="/home/:category/search/:keyword"
        element={<ProtectedRoute element={<Catalog />} />}
      />
      <Route
        path="/home/:category/:id"
        element={<ProtectedRoute element={<Details />} />}
      />
      <Route
        path="/episode/:id"
        element={<ProtectedRoute element={<EpisodeDetailPage />} />}
      />
      <Route
        path="/player"
        element={
          <ProtectedRoute element={<Player episodes={dummyEpisodes} />} />
        }
      />
            <Route path="/404" element={<ErrorPage />} /> 

      {/* Fallback Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
