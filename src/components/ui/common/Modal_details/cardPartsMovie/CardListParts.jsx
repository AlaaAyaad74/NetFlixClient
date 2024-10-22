import PropTypes from "prop-types";
import "./CardListPartsStyle.scss";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemContext } from "../../../../../App";
function CardListParts({ itemObj, image }) {
  const { setItem } = useContext(ItemContext);

  // Function to handle setting item when link is clicked
  const handleClick = () => {
    setItem(itemObj);
  };
  console.log(itemObj);
  return (
    <Link
      to={`/player/${itemObj._id}`}
      className="card_List"
      onClick={handleClick}
    >
      <span className="episod_Num">{itemObj.id || null}</span>
      <img
        className="episode_Image"
        src={image || itemObj.poster_path}
        alt=""
      />
      <div className="Info_episode">
        <h2>
          {itemObj.moviTitle || itemObj.name || itemObj.epissodeTitle}
          <span>{itemObj.releaseYear}</span>
        </h2>
        <p>
          {itemObj.movieDesc || itemObj.overview || itemObj.episodeDescription}
        </p>
      </div>
    </Link>
  );
}
CardListParts.propTypes = {
  itemObj: PropTypes.object.isRequired,
  image: PropTypes.string,
};
export default CardListParts;
