import "./InfoStyle.scss";
import PropTypes from "prop-types";

function Info({ item }) {
  return (
    <div className="Info">
      <div>
        {/* Title display, adjust for series and movies */}
        <h2 className="title">{item.title || item.name}</h2>
        <p className="description">{item.desc || item.overview}</p>
      </div>
      <div>
        {/* Render genres dynamically */}
        {item.genre && item.genre.length > 0 ? (
          <p className="genres">
            <span>Genres:</span>
  
          </p>
        ) : null}

        <p>{item.avgRuntime || "N/A"}</p> {/* Fallback for avgRuntime */}
        <p>Release Year: {item.releaseYear || "N/A"}</p> {/* Fallback for releaseYear */}
        <p>Rating: {item.rating || "N/A"}</p> {/* Fallback for rating */}
      </div>
    </div>
  );
}

Info.propTypes = {
  item: PropTypes.object.isRequired,
};

export default Info;
