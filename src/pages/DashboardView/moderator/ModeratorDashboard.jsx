import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./moderatorScss.scss"; // Import the SCSS file
import ModeratorApi from "../../../api/moderator"; // Ensure your API file has the necessary functions

const ModeratorDashboard = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ModeratorApi.getProfileData(); // Call your API to get user data
        setUser(response.data); // Update state with the user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUserData(); // Fetch user data when the component mounts
  }, []); // Empty dependency array to run this effect only once

  // Show loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.user.email}</h1>
      {/* Display user email or any other info */}
      <p className="user-role">
        Your role: <strong>{user?.user.fullName}</strong>
      </p>
      <h2>Moderator Actions</h2>
      <div className="action-buttons">
        <Link to="/dashboard/movies" className="button">manage movie</Link>
        <Link to="/dashboard/add-movie" className="button add-movie-button">
          Add Movie
        </Link>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
