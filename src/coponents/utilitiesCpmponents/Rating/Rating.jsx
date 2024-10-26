<<<<<<< HEAD
import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faCheck, faStar } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "./Rating.scss";

const RatingComponent = ({ movieId }) => {
  // console.log(movieId);
  // const [isAdded, setIsAdded] = useState(false); // Track if movie is in watchlist
  // const [rating, setRating] = useState(0); // User-selected rating
  // const [hoverRating, setHoverRating] = useState(0); // For hover effect
  // const [userId, setUserId] = useState(null); // Store user ID

  // Get userId from localStorage when component mounts
  // useEffect(() => {
  //   const token = localStorage.getItem("decodedToken");
  //   if (token) {
  //     const decoded = JSON.parse(token);
  //     setUserId(decoded.id);
  //     fetchUserRating(decoded.id);
  //     checkWatchlistStatus(decoded.id); // Check if movie is in watchlist
  //   }
  // }, [movieId]);

  // Fetch user rating for the movie
  // const fetchUserRating = async (userId) => {
  //   try {
  //     const response = await axios.get(`/api/user-rating/${userId}/${movieId}`);
  //     if (response.data && response.data.rating) {
  //       setRating(response.data.rating);
  //       // Set the saved rating if exists
  //       console.log(response.data.rating, "response Rating", userId);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user rating:", error);
  //   }
  // };

  // Check if the movie is already in the watchlist
  // const checkWatchlistStatus = async (userId) => {
  //   try {
  //     const response = await axios.get(`/api/watchlist/${userId}/${movieId}`);
  //     if (response.data && response.data.isAdded) {
  //       setIsAdded(true); // If movie is in watchlist, mark as added
  //     }
  //   } catch (error) {
  //     console.error("Error checking watchlist status:", error);
  //   }
  // };

  // Handle adding to watchlist (with API call)
  // const handleAddToWatchList = async () => {
  //   if (!isAdded) {
  //     try {
  //       await axios.post("/api/watchlist", { movieId, userId });
  //       setIsAdded(true); // Update state to show as added
  //     } catch (error) {
  //       console.error("Error adding to watchlist:", error);
  //     }
  //   } else {
  //     console.log("Movie already in the watchlist.");
  //   }
  // };

  // Handle rating (with API call)
  // const handleRating = async (rate) => {
  //   try {
  //     await axios.post("/api/rate", { movieId, userId, rating: rate });
  //     setRating(rate); // Update the rating in the UI
  //   } catch (error) {
  //     console.error("Error rating the movie:", error);
  //   }
  // };

  return (
    <div className="movie-card__actions">
      {/* Rating Stars */}
      {/* <div className="rating">
        {[1, 2, 3, 4, 5].map((star) => (
          {/* <FontAwesomeIcon
            key={star}
            icon={faStar}
            onMouseEnter={() => setHoverRating(star)} // Show hover effect
            onMouseLeave={() => setHoverRating(0)} // Remove hover effect
            onClick={() => handleRating(star)} // Set rating on click
            className={`star ${
              hoverRating >= star || rating >= star ? "rated" : ""
            }`}
          /> */}
      {/* ))}
      </div> */}

      {/* Watchlist Button */}
      {/* <button
        className={`add-btn ${isAdded ? "added" : ""}`} // Add 'added' class if movie is in watchlist
        onClick={handleAddToWatchList}
        title={isAdded ? "Added to Watchlist" : "Add to Watchlist"}
        style={{ backgroundColor: isAdded ? "red" : "" }} // Background color changes if added
      >
        <FontAwesomeIcon icon={isAdded ? faCheck : faPlus} />{" "}
        {/* Change icon */}
      {/*</button> */}
    </div>
  );
};

RatingComponent.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default RatingComponent;
=======
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
            Authorization: `${localStorage.getItem("token")}`,
          };

          // Fetch user votes
          const votesResponse = await axios.get("/user/votes", { headers });
          const userVotes = votesResponse.data;

          // Check if movie has a rating
          const movieVote = userVotes.find((vote) => vote.movieId === movieId);
          if (movieVote) setRating(movieVote.rating);

          // Fetch user watchlist
          const watchlistResponse = await axios.get("/user/watchlist", {
            headers,
          });
          const userWatchlist = watchlistResponse.data;

          // Check if movie is in watchlist
          setInWatchlist(userWatchlist.includes(movieId));
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
      {/* Watchlist Button */}
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
>>>>>>> cdc897babd84823f240111af13053f3f343d0481
