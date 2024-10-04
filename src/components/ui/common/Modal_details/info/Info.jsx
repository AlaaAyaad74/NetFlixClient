import "./InfoStyle.scss";
import PropTypes from "prop-types";
function Info({ item }) {
  return (
    <div className="Info">
      <div>
        <h2 className="title">{item.title}</h2>
        <p className="description">{item.desc}</p>
      </div>
      <div>
        <p className="genres">
          <span>Genres:</span>
          {item.genre.map((gen, index) => (
            <p key={index}>{gen}</p>
          ))}
        </p>
        <p>{item.avgRuntime}</p>
        <p>Release Year : {item.releaseYear}</p>
        <p>Rating : {item.rating}</p>
      </div>
    </div>
  );
}
Info.propTypes = {
  item: PropTypes.object.isRequired,
};
export default Info;
