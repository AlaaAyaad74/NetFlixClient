import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // React Router v6 hook
import authApi from '../../../api/authApi'; // Import the API object
import SignupForm from '../components/SignupForm.jsx';
import "./auth.scss"; // Import the SCSS file

const AuthSignup = () => {
  const [isAdmin, setIsAdmin] = useState(true); // Toggle between admin and moderator
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error handling
  const navigate = useNavigate();

  const handleSignup = async (userData) => {
    setLoading(true);  // Start loading
    setError(null);    // Clear previous errors

    try {
      if (isAdmin) {
        // Call admin registration
        await authApi.registerAdmin(userData);
        alert('Admin registered successfully');
      } else {
        // Call moderator registration
        await authApi.registerModerator(userData);
        alert('Moderator registered successfully');
      }
      navigate('/login'); // Redirect to login page after success
    } catch (error) {
      console.error('Registration failed', error);
      setError('Failed to register. Please try again.'); // More user-friendly error message
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="login-page">
      <div className="overlay">
        <div className="login-container">
          <h2 className="login-title">{isAdmin ? "Admin" : "Moderator"} Signup</h2>

          {/* Toggle between admin and moderator */}
          <label className="role-toggle">
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
            Sign up as {isAdmin ? "Admin" : "Moderator"}
          </label>

          {/* Display error if exists */}
          {error && <p className="error-message">{error}</p>}

          {/* Pass the handleSignup function as a prop to the form component */}
          <SignupForm onSubmit={handleSignup} role={isAdmin ? "Admin" : "Moderator"} />

          {/* Display loading state */}
          {loading && <p className="loading-message">Registering...</p>}
        </div>
      </div>
    </div>
  );
};

export default AuthSignup;
