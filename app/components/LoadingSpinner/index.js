/**
 *
 * LoadingSpinner
 *
 */

import React from 'react';
import PropTypes from 'prop-types';

import { MetroSpinner } from 'react-spinners-kit';

function LoadingSpinner(props) {
  let containerStyle = {};

  if (props.hasBlanket) {
    containerStyle = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      zIndex: '1000',
    };
  } else {
    containerStyle = {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    };
  }

  return (
    <div className="default-loading-spinner" style={containerStyle}>
      <MetroSpinner
        loading
        size={props.size || 30}
        color={props.color ? props.color : '#0075C9'}
      />
    </div>
  );
}

LoadingSpinner.propTypes = {
  hasBlanket: PropTypes.bool,
  size: PropTypes.number,
  color: PropTypes.string,
};

export default LoadingSpinner;
