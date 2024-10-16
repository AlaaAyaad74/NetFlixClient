import axios from "axios";
import queryString from "query-string";
import apiConfig from "./apiConfig";

const axiosClient = axios.create({
  baseURL: apiConfig.baseUrl,
  headers: {
    "Content-Type": "application/json",
    // Add your authentication token if needed
  "Authorization": `Bearer ${localStorage.getItem("authToken")}`,
  },
  paramsSerializer: (params) =>
    queryString.stringify({
      ...params,
    }),
});

axiosClient.interceptors.request.use(async (config) => config);
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (err) => {
    throw err;
  }
);

export default axiosClient;
