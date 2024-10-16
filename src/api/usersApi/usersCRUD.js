// function decodeToken(token) {
//   if (!token) return null;

//   const payload = token.split(".")[1]; // Get the payload part
//   const decodedPayload = JSON.parse(atob(payload)); // Decode the Base64
//   return decodedPayload;
// }
import axios from "axios";

export const fetchUserData = async () => {
  try {
    // Define the configuration for the Axios request
    let authToken = localStorage.getItem("authToken");
    let config = {
      method: "get",
      url: "http://127.0.0.1:3331/admin/fetch-users", // Update URL with correct API path
      headers: {
        Authorization: `Bearer ${authToken}`, // Add your JWT token here
      },
      maxBodyLength: Infinity,
    };

    // Send the request to the API and await the response
    const response = await axios.request(config);
    console.log(`response`, response.data);
    // Return the fetched user data
    return response.data;
  } catch (error) {
    // Log any error that occurs during the request
    console.error("Error fetching user data:", error);
    return []; // Return an empty array in case of error
  }
};

// Get the role from localStorage
// const token = localStorage.getItem("token"); // Retrieve token from local storage
// const userRole = token ? decodeToken(token).role : null; // Decode the token to get the role

// let apiUrl = "";
// if (userRole === "usersAdmin") {
//   apiUrl = "/api/users"; // Endpoint for fetching users
// } else if (userRole === "moderatorsAdmin") {
//   apiUrl = "/api/moderators"; // Endpoint for fetching moderators
// } else {
//   console.error("Invalid user role:", userRole);
//   return [];
// }

// try {
//   // Fetch data from the determined endpoint
//   const response = await fetch(apiUrl);

//   if (!response.ok) {
//     throw new Error(`HTTP error! Status: ${response.status}`);
//   }

//   const data = await response.json();

//   // Merge fetched data with local userData if needed
//   return data;
// } catch (error) {
//   console.error("Error fetching data:", error);
//   return [];
// }

export const blockUser = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:3331/users/block/${userId}`, { method: "PUT" });
    if (!response.ok) throw new Error("Failed to block user");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

export const unblockUser = async (userId) => {
  try {
    const response = await fetch(`http://127.0.0.1:3331/users/unblock/${userId}`, { method: "PUT" });
    if (!response.ok) throw new Error("Failed to unblock user");
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};
export const updateUser = async (user) => {
  try {
    const { password, ...rest } = user; // Destructure to get password separately
    const response = await fetch(`/api/users/${rest.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(rest), // Pass only the user data excluding password
    });
    if (!response.ok) throw new Error("Failed to update user");

    // If there's a password, update it separately if needed
    if (password) {
      await fetch(`/api/users/${rest.id}/password`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};
