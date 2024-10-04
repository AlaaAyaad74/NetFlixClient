import PropTypes from "prop-types";
import "./BlockData.scss";

const BlockData = ({ title, imgSrc, direction = "left", desc }) => {
  return (
    <section className={`section-two-Block-Data ${direction}`}>
      <div className="content">
        <h2>{title}</h2>
        {desc && <p className="desc">{desc}</p>}
      </div>
      <div className="image">
        <img src={imgSrc} alt={title} />
      </div>
      <div className="divider"></div> {/* Add divider */}

    </section>
  );
};
// Add prop types es lint-disable-next-line
BlockData.propTypes = {
  title: PropTypes.string.isRequired,
  imgSrc: PropTypes.string.isRequired,
  direction: PropTypes.string,
  desc: PropTypes.string,
};
export default BlockData;