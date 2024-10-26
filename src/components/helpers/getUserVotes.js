import axios from "axios";

const getUserVotes = async () => {
  try {
    const token = localStorage.getItem("authToken");

    if (!token) {
      throw new Error("No authentication token found");
    }

    const response = await axios.get("http://localhost:3331/user/votes", {
      headers: {
        Authorization: `Bearer ${token}`, // Add the token to the Authorization header
      },
    });

    return response.data; // Return the actual user data
  } catch (error) {
    console.error("Error fetching user information:", error);
    throw error; // Re-throw the error if you need further handling elsewhere
  }
};

export default getUserVotes;
