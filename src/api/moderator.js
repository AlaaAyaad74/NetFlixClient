import axiosClient from "./axiosClient";

const ModeratorApi = {
  // add movie 
  addMovie: (credentials) => {
    return axiosClient.post("/movies/add-movie", credentials,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('authToken')}`, // Example of how to include an auth token
        },
      });
  }

};  

export default ModeratorApi;

