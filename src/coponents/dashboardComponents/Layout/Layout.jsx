import moment from "moment/moment";
import css from "./Layout.module.css";
import { BiSearch } from "react-icons/bi";
import Sidebar from "../Sidebar/Sidebar";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import ModeratorApi from "../../../api/moderator";
import { useEffect, useState } from "react";

const Layout = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate(); // Hook to handle navigation
  const [userProfile, setUserProfile] = useState({ fullName: "", email: "" });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await ModeratorApi.getProfileData();
        if (response.data && response.data.user) {
          setUserProfile({
            fullName: response.data.user.fullName,
            email: response.data.user.email,
          });
        } else {
          console.warn("Invalid response format");
        }
      } catch (error) {
        console.error("Failed to fetch profile data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear(); // Remove token from localStorage
    navigate("/login"); // Redirect to login page
  };

  if (loading) {
    return <div>Loading profile...</div>;
  }

  return (
    <div className={css.container}>
      <Sidebar />

      {pathname === "/" && <Navigate to="/dashboard" />}

      <div className={css.dashboard}>
        <div className={css.topBaseGradients}>
          <div className="gradient-red"></div>
          <div className="gradient-orange"></div>
          <div className="gradient-blue"></div>
        </div>

        <div className={css.header}>
          <span>{moment().format("dddd, Do MMM YYYY")}</span>

          <div className={css.searchBar}>
            <BiSearch size={20} />
            <input type="text" placeholder="Search" />
          </div>

          <div className={css.profile}>
            <div className={css.details}>
              {/* Display user full name and email */}
              <span>{userProfile.fullName || "User"}</span>
              <span>{userProfile.email || "No email available"}</span>

              {/* Logout button */}
              <button onClick={handleLogout} className={css.logoutButton}>
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className={css.content}>
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Layout;
