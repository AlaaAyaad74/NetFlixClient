import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../moderatorScss.scss"; // Import the SCSS file for styling
import ModeratorApi from "../../../../api/moderator"; // Ensure your API file has the necessary functions

const SeriesModerator = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [loading, setLoading] = useState(true); // State to handle loading

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await ModeratorApi.getProfileData(); // Fetch user data from the API
        setUser(response.data); // Update state with user data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };

    fetchUserData(); // Fetch user data when the component mounts
  }, []); // Empty dependency array to run this effect once

  // Show loading indicator while data is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.user.email}</h1>
      <p className="user-role">
        Your role: <strong>{user?.user.fullName}</strong>
      </p>
      <h2>Series Moderator Actions</h2>
      <div className="action-buttons">
        {/* Link to manage series */}
        <Link to="/dashboard/series" className="button">Manage Series</Link>

        {/* Link to add a new series */}
        <Link to="/dashboard/add-series" className="button add-series-button">
          Add Series
        </Link>
      </div>
    </div>
  );
};

export default SeriesModerator;
