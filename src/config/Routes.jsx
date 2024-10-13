import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleAuth"; // Import the ProtectedRoute for general auth
// import AdminProtectedRoute from "./adminAuth.js"; // Import Admin-specific ProtectedRoute
import ModeratorProtectedRoute from "./moderatorAuth"; // Ensure this path is correct

// Lazy-loaded components for pages
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
const CardDetails = lazy(() => import("../pages/CardDetails"));

 
const AuthLogin = lazy(() =>
  import("../pages/DashboardView/Authintecation/Login")
);  
const AuthSignup = lazy(() =>
  import("../pages/DashboardView/Authintecation/SignUp")
); // Unified signup page (Admin/Moderator)
// const AdminDashboard = lazy(() => import("../pages/AdminDashboard")); // Admin dashboard page
const ModeratorDashboard = lazy(() =>
  import("../pages/DashboardView/moderator/ModeratorDashboard")
);  
const AddMovie = lazy(() => import("../pages/DashboardView/moderator/AddMoview"));

const AppRoutes = () => {
  const dummyEpisodes = [
    {
      videoSrc:
        "https://res.cloudinary.com/dxxejizmf/video/upload/v1727776097/diw2ekeexu0b4gexi6ur.mp4",
      title: "Episode 1: The Beginning",
      description: "In this episode, we explore the origins of the story.",
      image: "/1.jpg",
    },
  ];

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/Profile" element={<Profile />} />
      <Route path="/CardDetails" element={<CardDetails />} />
      {/* Admin and Moderator Authentication Routes */}
      <Route path="/dashboard/login" element={<AuthLogin />} />{" "}
      {/* Unified login for Admin/Moderator */}
      <Route path="/dashboard/signUp" element={<AuthSignup />} />{" "}
      {/* Unified signup for Admin/Moderator */}
      {/* Admin Routes */}
      {/* <Route path="/admin-dashboard" element={<AdminProtectedRoute element={<AdminDashboard />} />} /> */}
      {/* Moderator Routes */}
      {/* <Route
        path="/dashboard/moderator-dashboard"
        element={<ModeratorProtectedRoute element={<ModeratorDashboard />} />}
      /> */}
      <Route path="/dashboard/moderator-dashboard" element={<ModeratorDashboard />} />
      <Route path="/dashboard/add-movie" element={<AddMovie />} />
      {/* Protected Routes (General users) */}
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      <Route
        path="/search"
        element={<ProtectedRoute element={<SearchPage />} />}
      />
      <Route
        path="home/:category/search/:keyword"
        element={<ProtectedRoute element={<Catalog />} />}
      />
      <Route
        path="home/:category/:id"
        element={<ProtectedRoute element={<Details />} />}
      />
      <Route
        path="home/:category"
        element={<ProtectedRoute element={<Catalog />} />}
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
      {/* Fallback Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
