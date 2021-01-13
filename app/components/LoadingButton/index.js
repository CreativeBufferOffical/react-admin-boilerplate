import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { ButtonSizes, ButtonColors } from 'constants/buttonConstants';

import Icon from 'components/Icon';
import LoadingSpinner from 'components/LoadingSpinner';

import './styles.scss';

const SpinnerSizeForButton = buttonSize => {
  switch (buttonSize) {
    case ButtonSizes.SMALL:
      return 15;
    case ButtonSizes.LARGE:
      return 30;
    default:
      return 20;
  }
};

const LoadingButton = props => (
  <Button
    className={`loading ${props.className}`}
    color={props.color}
    size={props.size}
    type={props.type}
    onClick={props.onClick}
    disabled={props.loading || props.disabled}
  >
    {props.iconName && !props.loading && <Icon name={props.iconName} />}
    {props.loading && (
      <LoadingSpinner size={SpinnerSizeForButton(props.size)} />
    )}
    {(props.iconName || props.loading) && <span className="spacer" />}
    {props.text && props.text}
  </Button>
);

LoadingButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string,
  iconName: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string,
  type: PropTypes.string,
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
};

LoadingButton.defaultProps = {
  color: ButtonColors.PRIMARY,
  size: ButtonSizes.SMALL,
  loading: false,
  onClick: () => {},
};

export default LoadingButton;
