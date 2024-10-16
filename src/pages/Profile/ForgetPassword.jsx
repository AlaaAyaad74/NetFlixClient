import React, { useState, useEffect } from "react";
import { Button, Box, TextField, Typography } from "@mui/material";
import { useLocation } from "react-router-dom"; // Import useLocation from react-router-dom
import ModeratorApi from '../../api/moderator'; // Import your API file
import "./Profile.scss"; // Import the Profile styles
import "./ForgetPassword.scss"; // Import the Forget Password styles

const ForgetPassword = () => {
  const location = useLocation(); // Get the location object from React Router
  const [email, setEmail] = useState(""); // State for email input
  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Message to show user
  const [error, setError] = useState(""); // Error message

  // Handle input change
  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    setLoading(true); // Set loading state
    setMessage(""); // Clear previous messages
    setError(""); // Clear previous errors

    try {
        const response = await ModeratorApi.requestPasswordReset(email); // Call the new API method
        setMessage(response.message || "Password reset link sent to your email.");
    } catch (err) {
        setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
        setLoading(false); // Reset loading state
    }
  };

  useEffect(() => {
    // If there is an email passed via location state, set it
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    }
  }, [location.state]);

  return (
    <Box className="forget-password-container">
      <Typography className="forget-password-title" variant="h5" component="h2" gutterBottom>
        Forget Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email Address"
          type="email"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="normal"
          value={email}
          onChange={handleInputChange}
          required
        />
        {loading && <Typography variant="body1">Loading...</Typography>}
        {message && <Typography className="forget-password-message" variant="body1" color="green">{message}</Typography>}
        {error && <Typography className="forget-password-message" variant="body1" color="red">{error}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className="action-button" // Apply the action button class
        >
          Send Reset Link
        </Button>
      </form>
    </Box>
  );
};

export default ForgetPassword;
