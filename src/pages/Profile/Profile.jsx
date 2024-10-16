import React, { useEffect, useState } from "react";
import { Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { useNavigate } from "react-router-dom";
import "./Profile.scss"; // Import the SCSS file
import TextComponent from "../../coponents/utilitiesCpmponents/text/TextComponent";
import ModeratorApi from '../../api/moderator'; // Make sure to import your API file

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null); // State for user data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch user profile data
  const fetchProfileData = async () => {
    try {
      const response = await ModeratorApi.getProfileData();
      setUser(response.data.user); // Adjusted to access the user data correctly
    } catch (err) {
      setError("Error fetching profile data. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  const handleForgetPassword = () => {
    navigate("/forgot-password", { state: { email: user?.email } });  
  };
  
  const handleDeleteAccount = () => {
    console.log("Delete Account");
    // Implement account deletion logic
  };

  const handleSubscribePrime = () => {
    console.log("Subscribe to Prime");
    // Implement subscription logic
  };

  const handleLogout = () => {
    console.log("Logged out");
    localStorage.removeItem("authToken");
    localStorage.removeItem("decodedToken");
    localStorage.removeItem("userRole");
    navigate("/login");
  };

  return (
    <Box className="profile-container">
      {loading ? (
        <TextComponent text="Loading..." color="#fff" fontWeight="bold" size="1.5rem" />
      ) : error ? (
        <TextComponent text={error} color="#f00" fontWeight="bold" size="1.5rem" />
      ) : (
        <>
          <TextComponent
            className="profile-title"
            color="#fff"
            text={user?.fullName || "User Name"}
            fontWeight="bold"
            size="2rem"
          />
          <TextComponent
            color="#fff"
            text={user?.email || "User Email"}
            fontWeight="bold"
            size="1.1rem"
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

            {/* Conditionally render Subscribe to Prime button */}
            {!user?.isPrime ? (
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
            ) : (
              <TextComponent
                text="You are already subscribed to Prime."
                color="#00FF00"
                fontWeight="bold"
                size="1.2rem"
              />
            )}

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
              Log Out
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default Profile;
