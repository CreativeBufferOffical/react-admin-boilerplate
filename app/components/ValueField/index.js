import React from 'react';
import PropTypes from 'prop-types';

import { FormGroup, Label } from 'reactstrap';

import LoadingSpinner from 'components/LoadingSpinner';

import './styles.scss';

const ValueField = ({
  className,
  label,
  value,
  overrideColor,
  loading,
  required,
}) => (
  <FormGroup className={className}>
    <Label>
      {label}:{required && <span className="road-red"> *</span>}
    </Label>
    <div className={`value "${overrideColor ? 'mb-2' : 'text-dark mb-2'}`}>
      {loading && <LoadingSpinner size={20} />}
      {value}
    </div>
  </FormGroup>
);

ValueField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.any,
  overrideColor: PropTypes.bool,
  className: PropTypes.string,
  loading: PropTypes.bool,
  required: PropTypes.bool,
};

export default ValueField;
