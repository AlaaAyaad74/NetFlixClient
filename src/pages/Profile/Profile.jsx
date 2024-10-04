import React from "react";
import { Button, Typography, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import "./Profile.scss"; // Import the SCSS file
import TextComponent from "../../coponents/utilitiesCpmponents/text/TextComponent";
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
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <Box className="profile-container">
      <TextComponent
        className="profile-title"
        color={"#fff"}
        text={user?.name || "User Name"}
        fontWeight={"bold"}
        size={"2rem"}
      />
      <TextComponent
        color={"#fff"}
        text={user?.email || "User Email"}
        fontWeight={"bold"}
        size={"1.1rem"}
      />

      <Box className="profile-actions">
        <Button
          className="forget-password"
          onClick={handleForgetPassword}
          startIcon={<LockOpenIcon />}
          variant="contained"
          color="primary"
          size="large"
          sx={{
            textTransform: "none",
            alignContent: "start",
            color: "#f0f0f0",
            backgroundColor: "black",
            justifyContent: "start",
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            "& .MuiButton-startIcon": {
              marginRight: "0.5rem",
            },
          }}
        >
          Forget Password
        </Button>
        <Button
          className="subscribe-prime"
          variant="contained"
          color="success"
          size="large"
          sx={{
            textTransform: "none",
            alignContent: "start",
            color: "#f0f0f0",
            backgroundColor: "goldenrod",
            justifyContent: "start",
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            "& .MuiButton-startIcon": {
              marginRight: "0.5rem",
            },
          }}
          onClick={handleSubscribePrime}
          startIcon={<AttachMoneyIcon />}
        >


          Subscribe to Prime
        </Button>
        <Button
          className="delete-account"
          onClick={handleDeleteAccount}
          variant="contained"
           size="large"
          sx={{
            textTransform: "none",
            color: "#f0f0f0",
            backgroundColor: "black",
            alignContent: "start",
            justifyContent: "start",
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            "& .MuiButton-startIcon": {
              marginRight: "0.5rem",
            },
          }}
          startIcon={<DeleteIcon />}
        >
          Delete My Account
        </Button>
        <Button
          className="logout"
          onClick={handleLogout}
          startIcon={<ExitToAppIcon />}
          variant="contained"
          color="error"
          size="large"
          sx={{
            textTransform: "none",
            alignContent: "start",       color: "#f0f0f0",
            backgroundColor: "black",
            justifyContent: "start",
            fontWeight: "bold",
            fontSize: "1.2rem",
            padding: "0.5rem 1rem",
            borderRadius: "8px",
            "& .MuiButton-startIcon": {
              marginRight: "0.5rem",
            },
          }}
        >
          Log Out
        </Button>
      </Box>
    </Box>
  );
};

export default Profile;
