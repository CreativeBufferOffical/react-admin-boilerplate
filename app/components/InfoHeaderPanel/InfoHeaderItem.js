import React from 'react';
import PropTypes from 'prop-types';

const InfoHeaderItem = ({ title, value }) => (
  <span>
    <b className="fslso-midnight-blue">{title}</b>
    {value}
  </span>
);

InfoHeaderItem.propTypes = {
  title: PropTypes.any.isRequired,
  value: PropTypes.any,
};

export default InfoHeaderItem;
