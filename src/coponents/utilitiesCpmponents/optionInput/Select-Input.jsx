import React from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import PropTypes from 'prop-types';
import FormHelperText from '@mui/material/FormHelperText';
import './select-Input.scss';

export default function SelectInput({
  value = '',
  onChange,
  options = [],
  label = '',
  placeholder = '',
}) {
  const handleChange = (event) => {
    if (onChange) {
      onChange(event);
    }
  };

  return (
    <Box sx={{ minWidth: 120, textAlign: 'center' }}>
      <FormControl className="select-input">
        <Select
          labelId="select-input-label"
          id="select-input"
          value={value}
          label={label}
          onChange={handleChange}
          displayEmpty
        >
          {placeholder && (
            <MenuItem value="" disabled>
              {placeholder}
            </MenuItem>
          )}
          {options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
              className="select-input-options"
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        <FormHelperText>{label || 'Without label'}</FormHelperText>
      </FormControl>
    </Box>
  );
}

SelectInput.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ),
  label: PropTypes.string,
  placeholder: PropTypes.string,
};
