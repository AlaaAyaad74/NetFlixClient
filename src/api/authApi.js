import axiosClient from "./axiosClient";

const authApi = {
  login: (credentials) => {
    // Send a POST request to the login endpoint with the email and password
    return axiosClient.post("/auth/login", credentials);
  },
  register: (user) => {
    // Send a POST request to the register endpoint with the user object
    return axiosClient.post("/auth/register", user);
  },
};

export default authApi;
