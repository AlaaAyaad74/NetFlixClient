import { useEffect, useState } from "react";
import MovieCard from "../../coponents/utilitiesCpmponents/movieCard/MovieCard";
import axios from "axios"; // assuming axios is used for API calls

const MyList = () => {
  const [watchList, setWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Assuming the API requires a token for authentication
    const token = localStorage.getItem("token"); // Retrieve token from localStorage or another source

    const fetchUserLists = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        // Fetch user's watchlist and watched list from the backend
        const watchListResponse = await axios.get("/api/user/watchlist", { headers });
        const watchedListResponse = await axios.get("/api/user/watched", { headers });

        setWatchList(watchListResponse.data); // Assuming data is an array of movies
        setWatchedList(watchedListResponse.data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch your movie lists. Please try again later.");
        setLoading(false);
      }
    };

    fetchUserLists();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="my-list">
      <div className="my-list__section">
        <h2>To Watch</h2>
        <div className="movie-grid">
          {watchList.length > 0 ? (
            watchList.map((item, i) => <MovieCard item={item} key={i} />)
          ) : (
            <p>No movies in your watch list.</p>
          )}
        </div>
      </div>

      <div className="my-list__section">
        <h2>Watched</h2>
        <div className="movie-grid">
          {watchedList.length > 0 ? (
            watchedList.map((item, i) => <MovieCard item={item} key={i} />)
          ) : (
            <p>No movies in your watched list.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyList;
