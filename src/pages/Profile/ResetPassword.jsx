import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useParams, useNavigate } from "react-router-dom";
import ModeratorApi from '../../api/moderator'; // Import the API file
import "./ForgetPassword.scss";  

const ResetPassword = () => {
  const { token } = useParams(); // Extract the token from the URL
  const navigate = useNavigate(); // For navigation after success
  const [password, setPassword] = useState(""); // State to store new password
  const [confirmPassword, setConfirmPassword] = useState(""); // State to confirm password
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(""); // Error state
  const [message, setMessage] = useState(""); // Message state

  // Handle password input change
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  // Handle confirm password input change
  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Check if passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true); // Set loading state
    setError(""); // Clear previous errors
    setMessage(""); // Clear previous messages

    try {
      const response = await ModeratorApi.resetPassword(token, password); // Call the API method
      setMessage("Password successfully reset. Redirecting to login...");
      localStorage.clear();
      setTimeout(() => navigate("/login"), 3000); // Redirect to login after 3 seconds
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  return (
    <Box className="reset-password-container">
      <Typography className="reset-password-title" variant="h5" component="h2" gutterBottom>
        Reset Your Password
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="New Password"
          type="password"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="normal"
          value={password}
          onChange={handlePasswordChange}
          required
        />
        <TextField
          label="Confirm New Password"
          type="password"
          variant="outlined"
          fullWidth
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{ style: { color: "white" } }}
          margin="normal"
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          required
        />
        {loading && <Typography variant="body1">Loading...</Typography>}
        {error && <Typography variant="body1" color="red">{error}</Typography>}
        {message && <Typography variant="body1" color="green">{message}</Typography>}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loading}
          className="action-button"
        >
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default ResetPassword;
