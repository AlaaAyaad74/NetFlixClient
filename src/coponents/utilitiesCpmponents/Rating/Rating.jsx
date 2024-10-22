import { useState } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Rating.scss";

const RatingComponent = ({ movieId }) => {
  const [isAdded, setIsAdded] = useState(false);
  const [rating, setRating] = useState(0); // User-selected rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect

  // Handle adding to watchlist (with API call)
  const handleAddToWatchList = async () => {
    if (!isAdded) {
      try {
        await axios.post("/api/watchlist", { movieId });
        setIsAdded(true);
      } catch (error) {
        console.error("Error adding to watchlist:", error);
      }
    }
  };

  // Handle rating (with API call)
  const handleRating = async (rate) => {
    try {
      await axios.post("/api/rate", { movieId, rating: rate });
      setRating(rate);
    } catch (error) {
      console.error("Error rating the movie:", error);
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
            onMouseEnter={() => setHoverRating(star)}
            onMouseLeave={() => setHoverRating(0)}
            onClick={() => handleRating(star)}
            className={`star ${
              hoverRating >= star || rating >= star ? "rated" : ""
            }`}
          />
        ))}
      </div>
      {/* Watchlist Button */}
      <button
        className={`add-btn ${isAdded ? "added" : ""}`}
        onClick={handleAddToWatchList}
        title={isAdded ? "Added to Watchlist" : "Add to Watchlist"}
      >
        <FontAwesomeIcon icon={isAdded ? faCheck : faPlus} />
      </button>
    </div>
  );
};

RatingComponent.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default RatingComponent;
