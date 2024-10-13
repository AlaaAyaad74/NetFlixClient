// src/pages/DashboardView/moderator/ModeratorDashboard.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import "./moderatorScss.scss"; // Import the SCSS file

const ModeratorDashboard = () => {
  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  return (
    <div className="dashboard">
      <h1>Welcome, {user?.email}</h1> {/* Display user email or any other info */}
      <p className="user-role">Your role: <strong>{user?.role}</strong></p>

      <h2>Moderator Actions</h2>
      <div className="action-buttons">
        <Link  className="button">View Reports</Link>
        <Link to="/dashboard/add-movie" className="button add-movie-button">Add Movie</Link>
      </div>
    </div>
  );
};

export default ModeratorDashboard;
