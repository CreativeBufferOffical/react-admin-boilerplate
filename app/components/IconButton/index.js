import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Icon from 'components/Icon';

const UnstyledButton = styled.button`
  color: inherit:
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
  outline: inherit;
  background: none;
  font-size: ${props => props.fontSize} !important;
`;

const IconButton = props => (
  <UnstyledButton
    type={props.type}
    onClick={props.onClick}
    className={props.className}
    style={{ border: 'none' }}
    fontSize={props.fontSize}
  >
    <Icon name={props.name} />
  </UnstyledButton>
);

IconButton.propTypes = {
  name: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  fontSize: PropTypes.string,
  type: PropTypes.string,
};

IconButton.defaultProps = {
  type: 'button',
};

export default IconButton;
