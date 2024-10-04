import  { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./middleAuth"; // Import the ProtectedRoute

const LandingPage = lazy(() => import("../pages/LandingPage"));
const ErrorPage = lazy(() => import("../coponents/utilitiesCpmponents/errorPage/ErrorPage"));
const HomePage = lazy(() => import("../pages/Home"));
const Details = lazy(() => import("../pages/details/Details"));
const SearchPage = lazy(() => import("../pages/SearchPage"));
const Catalog = lazy(() => import("../pages/Catalog"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const EpisodeDetailPage = lazy(() => import("../pages/EpisodeDetailPage"));
const Player = lazy(() => import("../coponents/utilitiesCpmponents/Player/Player"));
const RegisterPage = lazy(() => import("../pages/RegisterPage"));

const AppRoutes = () => {
  const dummyEpisodes = [
    {
      videoSrc: "https://res.cloudinary.com/dxxejizmf/video/upload/v1727776097/diw2ekeexu0b4gexi6ur.mp4",
      title: "Episode 1: The Beginning",
      description: "In this episode, we explore the origins of the story.",
      image: "/1.jpg",
    },
    {
      videoSrc: "./M1.mp4",
      title: "Episode 2: The Adventure Continues",
      description: "The characters embark on a thrilling journey.",
      image: "https://example.com/image2.jpg",
    },
    {
      videoSrc: "https://www.youtube.com/watch?v=RlPNh_PBZb4",
      title: "Episode 3: The Final Showdown",
      description: "The epic conclusion to the series.",
      image: "https://example.com/image3.jpg",
    },
  ];

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* Protected Routes */}
      <Route path="/home" element={<ProtectedRoute element={<HomePage />} />} />
      <Route path="/search" element={<ProtectedRoute element={<SearchPage />} />} />
      <Route path="home/:category/search/:keyword" element={<ProtectedRoute element={<Catalog />} />} />
      <Route path="home/:category/:id" element={<ProtectedRoute element={<Details />} />} />
      <Route path="home/:category" element={<ProtectedRoute element={<Catalog />} />} />
      <Route path="/episode/:id" element={<ProtectedRoute element={<EpisodeDetailPage />} />} />
      <Route path="/player" element={<ProtectedRoute element={<Player episodes={dummyEpisodes} />} />} />

      {/* Fallback Route */}
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
