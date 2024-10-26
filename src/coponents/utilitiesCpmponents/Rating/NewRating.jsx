import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import postRating from "../../../components/helpers/setUserRating";
import PropTypes from "prop-types";
import "./Rating.scss";
function NewRating({ movieId, userRating }) {
  const [rating, setRating] = useState(0); // User-selected rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [userId, setUserId] = useState(null); // Store user ID
  console.log(userRating);
  useEffect(() => {
    // Retrieve the user ID from localStorage token
    const token = localStorage.getItem("decodedToken");
    if (token) {
      const decoded = JSON.parse(token);

      setUserId(decoded.id);
      // Optionally fetch user's previous rating for the movie
    }
  }, [movieId]);

  const handleRatingClick = async (star) => {
    setRating(star); // Update the rating locally
    if (userId) {
      try {
        await postRating(star, movieId); // Send rating to the server
        // Optionally add a success message or notification
      } catch (error) {
        console.error("Error posting the rating:", error);
        // Optionally add an error message or notification
      }
    }
  };

  return (
    <div className="movie-card__actions">
      {userRating ? (
        <div className="rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <FontAwesomeIcon
              key={star}
              icon={faStar}
              className={`star ${userRating >= star ? "rated" : ""}`}
            />
          ))}
        </div>
      ) : (
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
      )}
    </div>
  );
}

NewRating.propTypes = {
  movieId: PropTypes.string.isRequired,
  userRating: PropTypes.number,
};

export default NewRating;
