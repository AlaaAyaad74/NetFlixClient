import PropTypes from "prop-types";
import "./CardListPartsStyle.scss";
function CardListParts({ id, image, title, year, description }) {
  return (
    <a className="card_List" href="#">
      <span className="episod_Num">{id}</span>
      <img className="episode_Image" src={image} alt="" />
      <div className="Info_episode">
        <h2>
          {title}
          <span>{year}</span>
        </h2>
        <p>{description}</p>
      </div>
    </a>
  );
}
CardListParts.propTypes = {
  image: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default CardListParts;
