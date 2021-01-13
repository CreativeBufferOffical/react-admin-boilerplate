/**
 *
 * Icon
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

const Icon = ({ className = '', top, name }) => (
  <span className={`si si-${name} ${className}`} style={{ top }} />
);

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  top: PropTypes.number,
  className: PropTypes.string,
};

export default Icon;
