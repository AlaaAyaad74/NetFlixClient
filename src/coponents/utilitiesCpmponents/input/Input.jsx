import PropTypes from "prop-types";
import "./input.scss";
const Input = (props) => {
  return (
    <input
      className="input"
      type={props.type}
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange ? (e) => props.onChange(e) : null}
    />
  );
};

Input.propTypes = {
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

export default Input;
