// src/components/TextComponent.jsx
import PropTypes from "prop-types";
import "./TextComponent.scss"; // Create this file for styling

const TextComponent = ({ text, size, fontWeight, textDecoration, color }) => {
  const style = {
    fontSize: size,
    fontWeight: fontWeight,
    textDecoration: textDecoration,
    color: color
  };

  return <p className="text-component" style={style}>{text}</p>;
};

TextComponent.propTypes = {
  text: PropTypes.string.isRequired,
  size: PropTypes.string,
  fontWeight: PropTypes.string,
  textDecoration: PropTypes.string,
  color: PropTypes.string
};

TextComponent.defaultProps = {
  size: "16px",
  fontWeight: "normal",
  textDecoration: "none",
  color: "black"
};

export default TextComponent;
