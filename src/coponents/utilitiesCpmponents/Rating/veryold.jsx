import { faPlus, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import postRating from "../../../components/helpers/setUserRating";
import PropTypes from "prop-types";
import "./Rating.scss";

function RatingComponent({ movieId }) {
  const [rating, setRating] = useState(0); // User-selected rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [userId, setUserId] = useState(null); // Store user ID
  const [inWatchlist, setInWatchlist] = useState(false); // Watchlist button state

  useEffect(() => {
    const token = localStorage.getItem("decodedToken");
    if (token) {
      const decoded = JSON.parse(token);
      setUserId(decoded.id);

      // Fetch user votes and watchlist to set initial state
      const fetchUserData = async () => {
        try {
          const headers = {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          };

          // Fetch user votes
          const votesResponse = await axios.get("/user/votes", { headers });
          const userVotes = votesResponse.data.votes; // Access the votes array
          console.log("==============================");
          console.log(votesResponse);
          console.log("==============================");
          // Check if movie has a rating
          const movieVote = userVotes.find(
            (vote) => vote.contentId === parseInt(movieId)
          );
          if (movieVote) setRating(movieVote.userRating); // Set the rating based on user rating

          // Fetch user watchlist
          const watchlistResponse = await axios.get("/user/watchlist", {
            headers,
          });
          const userWatchlist = watchlistResponse.data; // Assuming watchlist response is an array

          // Check if movie is in watchlist
          setInWatchlist(userWatchlist.includes(parseInt(movieId)));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [movieId]);

  // Handle rating submission
  const handleRatingClick = async (star) => {
    setRating(star); // Update the rating locally
    if (userId) {
      try {
        await postRating(star, movieId); // Send rating to the server
        console.log("Rating submitted successfully");
      } catch (error) {
        console.error("Error posting the rating:", error);
      }
    }
  };

  // Handle adding/removing from watchlist
  const handleWatchlistToggle = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      };

      if (inWatchlist) {
        // Remove from watchlist
        await axios.delete(`/user/watchlist/${movieId}`, { headers });
        setInWatchlist(false);
        console.log("Movie removed from watchlist");
      } else {
        // Add to watchlist
        await axios.post("/user/watchlist", { movieId }, { headers });
        setInWatchlist(true);
        console.log("Movie added to watchlist");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
    }
  };

  return (
    <div className="movie-card__actions">
      {/* Rating Stars */}
      <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          <FontAwesomeIcon
            key={star}
            icon={faStar}
            onMouseEnter={() => setHoverRating(star)} // Show hover effect
            onMouseLeave={() => setHoverRating(0)} // Remove hover effect
            onClick={() => handleRatingClick(star)} // Set rating on click
            className={`star ${
              hoverRating >= star || rating >= star ? "rated" : ""
            }`}
          />
        ))}
      </div>

      <button
        className={`add-btn ${inWatchlist ? "added" : ""}`} // Add 'added' class if movie is in watchlist
        onClick={handleWatchlistToggle}
        title={inWatchlist ? "Added to Watchlist" : "Add to Watchlist"}
        style={{ backgroundColor: inWatchlist ? "red" : "" }} // Background color changes if added
      >
        <FontAwesomeIcon icon={inWatchlist ? faCheck : faPlus} />{" "}
        {/* Change icon */}
      </button>
    </div>
  );
}

RatingComponent.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default RatingComponent;
