import React from 'react';
import PropTypes from 'prop-types';
import { fieldInputPropTypes } from 'redux-form/immutable';

export function SelectDropDown({
  input,
  options,
  disabled = false,
  className,
}) {
  return (
    <select {...input} disabled={disabled} className={className}>
      {options &&
        options.map(option => (
          <option key={option.id} value={option.value}>
            {option.label}
          </option>
        ))}
    </select>
  );
}

SelectDropDown.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  disabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SelectDropDown;
