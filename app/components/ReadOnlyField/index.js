import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, Label } from 'reactstrap';

const ReadOnlyField = ({ label, value, overrideColor, noValue, className }) => (
  <FormGroup className={className}>
    <Label>{label}:</Label>
    {!noValue && (
      <div className={overrideColor ? 'mb-2' : 'text-dark mb-2'}>
        {value || '--'}
      </div>
    )}
  </FormGroup>
);

ReadOnlyField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string,
  overrideColor: PropTypes.bool,
  noValue: PropTypes.bool,
  className: PropTypes.string,
};

export default ReadOnlyField;
