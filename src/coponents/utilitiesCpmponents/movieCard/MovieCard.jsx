

import PropTypes from "prop-types";
import "./movieCard.scss";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import apiConfig from "../../../api/apiConfig";
import RatingComponent from "../Rating/NewRating"; // Import the new component
import qs from "query-string";
// import { useState } from "react";

const MovieCard = (props) => {
  const item = props.item;
  console.log(item);
  
  const link = `/home/movie/${item._id}?${qs.stringify(item)}`;
  const bg =
    item.poster_path || item.imgSm || apiConfig.image(item.poster_path);

  return (
    <div className="movie__card__container">
      <Link to={link} className="movie-card__link">
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <button className="btn play-btn">
            <FontAwesomeIcon icon={faPlay} />
          </button>
        </div>
        <h3 className="movie-card__name">{item.title || item.name}</h3>
      </Link>

      {/* Use the new RatingComponent */}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <p>{item.rating}</p>
        <p>{item.releaseYear}</p>
      </div>
      <RatingComponent movieId={item._id} userRating={item?.userRating} />
      {/* <p>Votes {item.votes.flat()}</p> */}
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.object.isRequired,
};

export default MovieCard;
