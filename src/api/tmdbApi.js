import axiosClient from "./axiosClient";

export const category = {
  movie: "movie",
  tv: "tv",
};

export const movieType = {
  upcoming: "upcoming",
  popular: "popular",
  top_rated: "top_rated",
};

export const tvType = {
  popular: "popular",
  top_rated: "top_rated",
  on_the_air: "on_the_air",
};
export const genre = [
  {
    id: 28,
    name: "Action",
  },
  {
    id: 12,
    name: "Adventure",
  },
  {
    id: 16,
    name: "Animation",
  },
  {
    id: 35,
    name: "Comedy",
  },
  {
    id: 80,
    name: "Crime",
  },
  {
    id: 99,
    name: "Documentary",
  },
  {
    id: 18,
    name: "Drama",
  },
  {
    id: 10751,
    name: "Family",
  },
  {
    id: 14,
    name: "Fantasy",
  },
  {
    id: 36,
    name: "History",
  },
  {
    id: 27,
    name: "Horror",
  },
  {
    id: 10402,
    name: "Music",
  },
  {
    id: 9648,
    name: "Mystery",
  },
  {
    id: 10749,
    name: "Romance",
  },
  {
    id: 878,
    name: "Science Fiction",
  },
  {
    id: 10770,
    name: "TV Movie",
  },
  {
    id: 53,
    name: "Thriller",
  },
  {
    id: 10752,
    name: "War",
  },
  {
    id: 37,
    name: "Western",
  },
];

const customApi = {
  // Fetch movies with pagination
  getMoviesList: (params) => {
    const url = "/movies/movies";
    return axiosClient.get(url, { params });
  },

  // Fetch series
  getSeriesList: (params) => {
    const url = "/series/series";
    return axiosClient.get(url, { params });
  },

  // Get movie details by ID
  getMovieDetail: (id) => {
    const url = `/movies/fetch-movie/${id}`;
    return axiosClient.get(url);
  },

  // Get series details by ID
  getSeriesDetail: (id) => {
    const url = `series/fetch-series/${id}`;
    return axiosClient.get(url);
  },

  // Upcoming movies
  getUpcomingMovies: () => {
    const url = "/movies/upcoming-movies";
    return axiosClient.get(url);
  },

  // Search for movies
  searchMovies: (query) => {
    const url = `/movies/search-movies`;
    return axiosClient.get(url, { params: { query } });
  },
  globalSearch: (query) => {
    const url = `/search/search`;
    return axiosClient.get(url, { params: { q: query } }); // Use 'q' as the query parameter
  },
  updateMovie: async (id, movieData) => {
    const url = `/movies/update-movie/${id}`;
    const response = await axiosClient.put(url, movieData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Include your auth token if necessary
        "Content-Type": "application/json",
      },
    });

    console.log(response);
    return response; // Assuming the API returns the updated movie data
  },
};
export default customApi;
