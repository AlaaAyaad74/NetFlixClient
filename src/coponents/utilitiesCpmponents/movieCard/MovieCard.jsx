import PropTypes from "prop-types";
import "./movieCard.scss";
import { Link } from "react-router-dom";
import { category } from "../../../api/tmdbApi";
import Button from "../button/Button";
import apiConfig from "../../../api/apiConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

const MovieCard = (props) => {
  const item = props.item;
  const link = "/home/" + category[props.category] + "/" + item.id;
  const bg = apiConfig.w500Image(
    item.poster_path ? item.poster_path : item.backdrop_path
  );

  return (
    <div className="movie__card__container">
      <Link to={link} className="movie-card__link">
        <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
          <Button>
            <FontAwesomeIcon icon={faPlay} />
          </Button>
        </div>
        <h3 className="movie-card__name">{item.title || item.name}</h3>
      </Link>
    </div>
  );
};

MovieCard.propTypes = {
  item: PropTypes.object,
  category: PropTypes.string,

  className: PropTypes.string,
};

export default MovieCard;
