import { faPlus, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import axios from "axios";
import postRating from "../../../components/helpers/setUserRating";
import PropTypes from "prop-types";
import "./Rating.scss";
function NewRating({ movieId, userRating }) {
  const [rating, setRating] = useState(0); // User-selected rating
  const [hoverRating, setHoverRating] = useState(0); // For hover effect
  const [userId, setUserId] = useState(null); // Store user ID
  const [inWatchlist, setInWatchlist] = useState(false); // Watchlist button state

  console.log(userRating);

  useEffect(() => {
    // Retrieve the user ID from localStorage token
    const token = localStorage.getItem("decodedToken");
    if (token) {
      const decoded = JSON.parse(token);

      setUserId(decoded.id);
      // Optionally fetch user's previous rating for the movie

      const fetchUserData = async () => {
        try {
          const AuthorizationToken = `${localStorage.getItem("authToken")}`;
          // Fetch user votes
          const votesResponse = await axios.get(
            "http://localhost:3331/user/votes",
            // {
            //   contentId: movieId,
            //   // contentType: "Movie", // assuming contentType is always "Movie"
            // },
            {
              headers: {
                Authorization: `Bearer ${AuthorizationToken}`, // Add the token to the Authorization header
              },
            }
          );
          const userVotes = votesResponse.data.votes; // Access the votes array

          // Check if movie has a rating
          const movieVote = userVotes.find(
            (vote) => vote.contentId === parseInt(movieId)
          );
          if (movieVote) setRating(movieVote.userRating); // Set the rating based on user rating

          // Fetch user watchlist
          const watchlistResponse = await axios.get(
            "http://localhost:3331/user/watchlist",
            // {
            //   contentId: movieId,
            //   // contentType: "Movie", // assuming contentType is always "Movie"
            // },

            {
              headers: {
                Authorization: `Bearer ${AuthorizationToken}`, // Add the token to the Authorization header
              },
            }
          );
          const userWatchlist = watchlistResponse.data; // Assuming watchlist response is an array
          // Check if movie is in watchlist
          setInWatchlist(userWatchlist.watchlist.includes(movieId));
          console.log("=================================");
          console.log(inWatchlist, movieId, "this is the movie id");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, [movieId, inWatchlist]);

  const handleRatingClick = async (star) => {
    setRating(star); // Update the rating locally
    if (userId) {
      try {
        await postRating(star, movieId); // Send rating to the server
        // Optionally add a success message or notification
        console.log("Rating submitted successfully");
      } catch (error) {
        console.error("Error posting the rating:", error);
        // Optionally add an error message or notification
      }
    }
  };
  const handleWatchlistToggle = async () => {
    try {
      const AuthorizationToken = `${localStorage.getItem("authToken")}`;

      if (inWatchlist) {
        // Remove from watchlist
        await axios.delete(
          `http://localhost:3331/user/watchlist`,
          { contentId: movieId },
          {
            headers: {
              Authorization: `Bearer ${AuthorizationToken}`, // Add the token to the Authorization header
            },
          }
        );
        setInWatchlist(false);
        console.log("Movie removed from watchlist");
      } else {
        // Add to watchlist
        await axios.post(
          "http://localhost:3331/user/watchlist",
          { contentId: movieId },
          {
            headers: {
              Authorization: `Bearer ${AuthorizationToken}`, // Add the token to the Authorization header
            },
          }
        );
        setInWatchlist(true);
        console.log("Movie added to watchlist");
      }
    } catch (error) {
      console.error("Error updating watchlist:", error);
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

NewRating.propTypes = {
  movieId: PropTypes.string.isRequired,
  userRating: PropTypes.number,
};

export default NewRating;
