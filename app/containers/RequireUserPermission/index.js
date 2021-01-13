/**
 *
 * RequireUserPermission
 *
 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import * as selectors from 'containers/App/selectors';
import * as permissionTokens from 'constants/permissionTokens';
import styled from 'styled-components';

const ALL_TOKENS = Object.values(permissionTokens);

const StyledValueLabel = styled.div`
  margin-top: 10px;
  height: 15px;
  color: #a1a3a3;
  font-family: 'Lato', 'serif';
  font-size: 12px;
  letter-spacing: 0.2px;
  line-height: 15px;
`;

const RequireUserPermission = props => {
  if (!ALL_TOKENS.includes(props.token))
    console.warn(`Permission token [${props.token}] not found!`);

  if (props.userLoading) return null;

  if (props.permissionTokens.includes(props.token)) return props.children;

  if (props.altText) return props.altText;

  if (props.customAltText) {
    return <StyledValueLabel>{props.customAltText}</StyledValueLabel>;
  }

  if (props.altComponent) return props.altComponent;

  return null;
};

RequireUserPermission.propTypes = {
  token: PropTypes.string.isRequired,
  altText: PropTypes.string,
  customAltText: PropTypes.string,
  altComponent: PropTypes.node,
  permissionTokens: PropTypes.arrayOf(PropTypes.string),
  userLoading: PropTypes.bool,
  children: PropTypes.node,
};

const mapStateToProps = createStructuredSelector({
  permissionTokens: selectors.selectPermissions,
  userLoading: selectors.userLoading,
});

const withConnect = connect(mapStateToProps);

export const enhance = compose(withConnect);

export default enhance(RequireUserPermission);
