import { RxCross2 } from "react-icons/rx";
import PropTypes from "prop-types";
import "./Viewstyle.scss";
function View({ setModal, item }) {
  return (
    <div className="view">
      <span className="exIcon" onClick={() => setModal(false)}>
        <RxCross2 />
      </span>
      {/* <img src={item.img} alt="" /> */}
      <iframe
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        src="https://www.youtube.com/embed/y7wm5SqOBWA?autoplay=1&mute=1"
        width="100%"
        height="500px"
        title="trailer"
        aria-controls=""
      ></iframe>
    </div>
  );
}
View.propTypes = {
  item: PropTypes.object.isRequired,
  setModal: PropTypes.func,
};
export default View;
