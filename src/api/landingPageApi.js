import axiosClient from "./axiosClient";
 

const landingPageApi = {
  getLandingPageData: () => {
    // Ensure the endpoint is correct
    return axiosClient.get(`http://localhost:3331/landingblocks/AllLandingPageData`);
  },
};

export default landingPageApi;
