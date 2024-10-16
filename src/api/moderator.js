import axios from "axios";

const ModeratorApi = {
  addMovie: (payload) => {
    return axios.post("http://localhost:3331/movies/add-movie", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Ensure the token is set
      },
    });
  },

  uploadContent: (formData) => {
    return axios.post("http://localhost:5000/api/content/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
  },

  getProfileData: async () => {
    const authToken = localStorage.getItem("authToken");
    try {
      const response = await axios.get("http://localhost:3331/user/profile", {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      console.log("Response:", response);
      return response;
    } catch (error) {
      console.error("Error fetching profile data:", error);
      if (error.response?.status === 403) {
        // Redirect or clear localStorage if token is invalid
        console.log("Token is invalid or expired. Redirecting...");
        localStorage.removeItem("authToken");
        // window.location.href = '/login'; // Redirect to login page
      }
      throw error;
    }
  },
  requestPasswordReset: async (email) => {
    const data = JSON.stringify({ email });
    const config = {
      method: "post",
      url: "http://localhost:3331/auth/request-password-reset", // Ensure this is the correct URL
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    try {
      const response = await axios.request(config);
      return response.data; // Return the response data
    } catch (error) {
      console.error("Error requesting password reset:", error);
      throw error; // Throw error to handle it in the component
    }
  },

  // New reset password function
  resetPassword: async (token, password) => {
    const config = {
      method: "post",
      url: `http://localhost:3331/auth/reset-password/${token}`, // Using the token in the URL
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({ password }), // Sending the new password
    };

    try {
      const response = await axios.request(config);
      return response.data;
    } catch (error) {
      console.error("Error resetting password:", error);
      throw error;
    }
  },
  addSeries: (payload) => {
    return axios.post("http://localhost:3331/series/add-series", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
    });
  },
};

export default ModeratorApi;
