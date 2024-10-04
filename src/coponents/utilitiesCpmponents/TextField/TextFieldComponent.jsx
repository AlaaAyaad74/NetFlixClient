import React from 'react';
import PropTypes from 'prop-types';
import './TextFieldComponent.scss';

const TextFieldComponent = ({
  hintText = '',
  prefixItem = null,
  value = '',
  onChange = () => {},
  onFocus = () => {},
  onBlur = () => {},
  type = 'text', // Set default value for the type prop here
  ...props
}) => {
  return (
    <div className="text-field-component">
      {prefixItem && <div className="prefix">{prefixItem}</div>}
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={hintText}
        {...props}
      />
    </div>
  );
};

TextFieldComponent.propTypes = {
  hintText: PropTypes.string,
  prefixItem: PropTypes.node,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  type: PropTypes.string,
};

export default TextFieldComponent;
