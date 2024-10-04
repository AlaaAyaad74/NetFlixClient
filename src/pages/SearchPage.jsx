// src/pages/SearchPage.jsx
import React from "react";
import SearchField from "../coponents/utilitiesCpmponents/search/SearchField";
import MovieList from "../coponents/movieList/MovieList";
import { category, movieType } from "../api/tmdbApi";

const SearchPage = () => {
  // Implement your search logic here
  // For example, using query parameters to fetch search results

  return (
    <div>
      <h1>Search</h1>
      <SearchField />
      {/* Display search results */}
      <MovieList category={category.movie} type={movieType.popular} />
      {/* Adjust as per your search implementation */}
    </div>
  );
};

export default SearchPage;
