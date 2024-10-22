// import PropTypes from "prop-types";
// import "./movieCard.scss";
// import { useState } from "react";
// import { Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faPlay,
//   faPlus,
//   faCheck,
//   faStar,
// } from "@fortawesome/free-solid-svg-icons";
// import apiConfig from "../../../api/apiConfig";
// import axios from "axios";

// const MovieCard = (props) => {
//   const item = props.item;
//   const link = "/home/movie/" + item._id;
//   const bg = item.poster_path || apiConfig.image(item.poster_path);

//   const [isAdded, setIsAdded] = useState(false);
//   const [rating, setRating] = useState(0); // For storing user-selected rating
//   const [hoverRating, setHoverRating] = useState(0); // For hover effect

//   // Handle adding to watchlist (with API call)
//   const handleAddToWatchList = async () => {
//     if (!isAdded) {
//       try {
//         await axios.post("/api/watchlist", { movieId: item._id });
//         setIsAdded(true);
//       } catch (error) {
//         console.error("Error adding to watchlist:", error);
//       }
//     }
//   };

//   // Handle rating (with API call)
//   const handleRating = async (rate) => {
//     try {
//       await axios.post("/api/rate", { movieId: item._id, rating: rate });
//       setRating(rate);
//     } catch (error) {
//       console.error("Error rating the movie:", error);
//     }
//   };

//   return (
//     <div className="movie__card__container">
//       <Link to={link} className="movie-card__link">
//         <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
//           <button className="btn play-btn">
//             <FontAwesomeIcon icon={faPlay} />
//           </button>
//         </div>
//         <h3 className="movie-card__name">{item.title}</h3>
//       </Link>

//       <div className="movie-card__actions">
//         {/* Rating Stars */}
//         <div className="rating">
//           {[1, 2, 3, 4, 5].map((star) => (
//             <FontAwesomeIcon
//               key={star}
//               icon={faStar}
//               onMouseEnter={() => setHoverRating(star)}
//               onMouseLeave={() => setHoverRating(0)}
//               onClick={() => handleRating(star)}
//               className={`star ${hoverRating >= star || rating >= star ? "rated" : ""}`}
//             />
//           ))}
//         </div>
//         {/* Watchlist Button */}
//         <button
//           className={`add-btn ${isAdded ? "added" : ""}`}
//           onClick={handleAddToWatchList}
//           title={isAdded ? "Added to Watchlist" : "Add to Watchlist"}
//         >
//           <FontAwesomeIcon icon={isAdded ? faCheck : faPlus} />
//         </button>

//       </div>
//     </div>
//   );
// };

// MovieCard.propTypes = {
//   item: PropTypes.object.isRequired,
// };

// export default MovieCard;

import PropTypes from "prop-types";
import "./movieCard.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../../api/apiConfig";
import RatingComponent from "../Rating/Rating"; // Import the new component

const MovieCard = (props) => {
  const item = props.item;
  const link = "/home/movie/" + item._id;
  const bg = item.poster_path || apiConfig.image(item.poster_path);

  return (
    <div className="movie__card__container">
      <Link to={link} className="movie-card__link">
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <button className="btn play-btn">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
        <h3 className="movie-card__name">{item.title}</h3>
      </Link>

      {/* Use the new RatingComponent */}
      <RatingComponent movieId={item._id} />
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MovieCard;
