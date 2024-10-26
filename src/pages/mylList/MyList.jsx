import { useEffect, useState } from "react";
import MovieCard from "../../coponents/utilitiesCpmponents/movieCard/MovieCard";
import axios from "axios";
import "./myList.scss";
const MyList = () => {
  const [watchList, setWatchList] = useState([]);
  const [ratedList, setRatedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const fetchUserLists = async () => {
      try {
        setLoading(true);

        // Fetch watchlist
        const watchlistResponse = await axios.get(
          "http://localhost:3331/user/watchlist",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const watchlistMovieIds = watchlistResponse.data.watchlist || [];

        // Fetch ratings
        const votesResponse = await axios.get(
          "http://localhost:3331/user/votes",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const votesData = Array.isArray(votesResponse.data)
          ? votesResponse.data
          : [];

        // Fetch movie or series details
        const fetchMovieOrSeries = async (movieId) => {
          try {
            const movieResponse = await axios.get(
              `http://localhost:3331/movies/fetch-movie/${movieId}`,
              { headers: { Authorization: `Bearer ${token}` } }
            );
            return movieResponse.data;
          } catch (error) {
            if (error.response && error.response.status === 404) {
              try {
                const seriesResponse = await axios.get(
                  `http://localhost:3331/series/fetch-series/${movieId}`,
                  { headers: { Authorization: `Bearer ${token}` } }
                );
                return seriesResponse.data;
              } catch (seriesError) {
                console.error(
                  `Series not found for ID ${movieId}:`,
                  seriesError
                );
                return null;
              }
            } else {
              console.error(`Error fetching data for ID ${movieId}:`, error);
            }
            return null;
          }
        };

        // Fetch details for watchlist
        const watchListData = (
          await Promise.all(
            watchlistMovieIds.map((movieId) => fetchMovieOrSeries(movieId))
          )
        ).filter((item) => item !== null);

        // Fetch details and ratings for rated list
        const ratedListData = (
          await Promise.all(
            votesData.map(async ({ contentId, userRating }) => {
              const movieData = await fetchMovieOrSeries(contentId);
              return movieData ? { ...movieData, userRating } : null;
            })
          )
        ).filter((item) => item !== null);

        setWatchList(watchListData);
        setRatedList(ratedListData);
      } catch (err) {
        console.error("Error in fetchUserLists:", err);
        setError("Failed to fetch your movie lists. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUserLists();
  }, []);

  // Filter movies based on the search term, checking for valid titles
  const filteredWatchList = watchList.filter(
    (movie) =>
      movie &&
      movie.name &&
      (searchTerm === "" ||
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredRatedList = ratedList.filter(
    (movie) =>
      movie &&
      movie.name &&
      (searchTerm === "" ||
        movie.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="container">
        <div className="my-list">
          {/* Search Bar */}
          <div className="movie-search">
            <input
              type="text"
              placeholder="Search in your lists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-bar"
            />
          </div>

          {/* Watchlist Section */}
          <div className="my-list__section">
            <h2>Your Watchlist</h2>
            <div className="movie-grid">
              {filteredWatchList.length > 0 ? (
                filteredWatchList.map((item, i) => (
                  <MovieCard item={item} key={i} />
                ))
              ) : watchList.length > 0 ? (
                watchList.map((item, i) => <MovieCard item={item} key={i} />)
              ) : (
                <div className="no-movies">
                  <p>
                    You have no movies in your watchlist yet. Start adding some!
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Rated Movies Section */}
          <div className="my-list__section">
            <h2>Your Rated Movies</h2>
            <div className="movie-grid">
              {filteredRatedList.length > 0 ? (
                filteredRatedList.map((item, i) => (
                  <MovieCard item={item} key={i} />
                ))
              ) : ratedList.length > 0 ? (
                ratedList.map((item, i) => <MovieCard item={item} key={i} />)
              ) : (
                <div className="no-movies">
                  <p>
                    You haven’t rated any movies yet. Rate some to see them
                    here!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyList;
