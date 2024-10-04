import { useState } from "react";
import "./CardStyle.scss";
import PropTypes from "prop-types";
import DetailsModal from "../Modal_details/DetailsModal";
function Card({ item }) {
  const [modal, setModal] = useState(false);
  return (
    <>
      <div className="card" onClick={() => setModal(true)}>
        {console.log(item)}
        {/* Seasons || Tv show */}
        {item.seasons && <img src={item.seasons[0].seasonPoster} alt="" />}
        {/* Movie Have Parts */}
        {item.parts && <img src={item.parts[0].moviePoster} alt="" />}
        {/* Movie Not Have Parts */}
      </div>
      {modal && <DetailsModal item={item} setModal={setModal} />}
    </>
  );
}
Card.propTypes = {
  item: PropTypes.object.isRequired,
};
export default Card;
