import React from "react";
import { Button, Typography, Box } from "@mui/material";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DeleteIcon from '@mui/icons-material/Delete';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { useNavigate } from "react-router-dom";
import './Profile.scss'; // Import the SCSS file

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleForgetPassword = () => {
    console.log("Forget Password");
    // Navigate to reset password page or trigger email send
  };

  const handleDeleteAccount = () => {
    console.log("Delete Account");
  };

  const handleSubscribePrime = () => {
    console.log("Subscribe to Prime");
  };

  const handleLogout = () => {
    console.log("Logged out");
    navigate("/login");
  };

  return (
 
      <Box className="profile-container">
 
        <Typography className="profile-title">
          {user?.name || "User Name"}
        </Typography>
        <Typography className="profile-info">
          {user?.email || "user@example.com"}
          <div className="email">user@example.com</div>
        </Typography>
        <Box className="profile-actions">
          <Button
            className="forget-password"
            onClick={handleForgetPassword}
            startIcon={<LockOpenIcon />}
          >
            Forget Password
          </Button>
          <Button
            className="subscribe-prime"
            onClick={handleSubscribePrime}
            startIcon={<AttachMoneyIcon />}
          >
            Subscribe to Prime
          </Button>
          <Button
            className="delete-account"
            onClick={handleDeleteAccount}
            startIcon={<DeleteIcon />}
          >
            Delete My Account
          </Button>
          <Button
            className="logout"
            onClick={handleLogout}
            startIcon={<ExitToAppIcon />}
          >
            Log Out
          </Button>
        </Box>
     </Box>
  );
};

export default Profile;
