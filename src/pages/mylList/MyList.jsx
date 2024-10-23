import { useEffect, useState } from "react";
import MovieCard from "../../coponents/utilitiesCpmponents/movieCard/MovieCard";
import axios from "axios";
import PageHeader from "../../coponents/utilitiesCpmponents/page-header/PageHeader";
import "./MyList.scss";

const MyList = () => {
  const [watchList, setWatchList] = useState([]);
  const [watchedList, setWatchedList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    const fetchUserLists = async () => {
      try {
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const watchListResponse = await axios.get("/api/user/watchlist", { headers });
        const watchedListResponse = await axios.get("/api/user/watched", { headers });

        setWatchList(watchListResponse.data);
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

  // Filter movies by search term
  const filteredWatchList = watchList.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredWatchedList = watchedList.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <PageHeader>Your Movie List</PageHeader>

      {/* Search Bar */}
      <div className="search-bar-container">
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
        <h2>To Watch</h2>
        <div className="movie-grid">
          {filteredWatchList.length > 0 ? (
            filteredWatchList.map((item, i) => <MovieCard item={item} key={i} />)
          ) : (
            <p>No movies in your watch list.</p>
          )}
        </div>
      </div>

      {/* Watched Section */}
      <div className="my-list__section">
        <h2>Watched</h2>
        <div className="movie-grid">
          {filteredWatchedList.length > 0 ? (
            filteredWatchedList.map((item, i) => <MovieCard item={item} key={i} />)
          ) : (
            <p>No movies in your watched list.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default MyList;
