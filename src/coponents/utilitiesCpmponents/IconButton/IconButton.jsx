// src/components/IconButton.jsx
import PropTypes from "prop-types";
import "./IconButton.scss"; // Create this file for styling if needed
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const IconButton = ({ icon, onClick, size, color, className }) => {
  return (
    <button
      className={`icon-button ${className}`}
      onClick={onClick}
      style={{ fontSize: size, color: color }}
    >
      <FontAwesomeIcon icon={icon} />
    </button>
  );
};

IconButton.propTypes = {
  icon: PropTypes.object.isRequired, // FontAwesomeIcon object
  onClick: PropTypes.func,
  size: PropTypes.string,
  color: PropTypes.string,
  className: PropTypes.string
};

IconButton.defaultProps = {
  onClick: () => {},
  size: "24px",
  color: "black",
  className: ""
};

export default IconButton;
