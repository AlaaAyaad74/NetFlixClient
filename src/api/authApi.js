import axiosClient from "./axiosClient";

const authApi = {
  // Regular user login
  login: (credentials) => {
    return axiosClient.post("/auth/login", credentials);
  },

  // Regular user registration
  register: (user) => {
    return axiosClient.post("/auth/register", user);
  },

  // Admin login
  loginAdmin: (credentials) => {
    return axiosClient.post("/auth/login-admin", credentials);
  },

  // Admin registration
  registerAdmin: (admin) => {
    return axiosClient.post("/auth/register-admin", admin);
  },

  // Moderator login (optional, for moderators if needed)
  loginModerator: (credentials) => {
    return axiosClient.post("/auth/login-moderator", credentials);
  },

  // Moderator registration (optional, for moderators if needed)
  registerModerator: (moderator) => {
    return axiosClient.post("/auth/register-moderator", moderator);
  },
};

export default authApi;
