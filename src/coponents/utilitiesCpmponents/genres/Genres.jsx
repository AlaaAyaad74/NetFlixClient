import PropTypes from "prop-types";
import "./genres.scss";
import { genre } from "../../../api/tmdbApi";

const Genres = (props) => {
  console.log(props.genre);
  if (!props.genre) return null;
  return (
    <span className="genres__item">
      {props.genre.name ||
        genre.map((genre) => (genre.id == props.genre ? genre.name : null))}
    </span>
  );
};

Genres.propTypes = {
  genre: PropTypes.object.isRequired,
};

export default Genres;
