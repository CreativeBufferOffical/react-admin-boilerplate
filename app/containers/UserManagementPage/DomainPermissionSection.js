import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { makePermissionTokensForDomainSelector } from 'containers/App/selectors';
import { ProductDomainShortNames } from 'constants/domainConstants';
import { generateTokenTree } from 'utils/permissionUtils';

import PermissionNode from './PermissionNode';

const DomainPermissionSection = props => (
  <div>
    <Collapsible
      open
      className="token-root-collapse"
      openedClassName="token-root-collapse"
      trigger={
        <React.Fragment>
          {`${ProductDomainShortNames[props.domain]} Roles`}
          <span className="collapsible-icon">
            <span className="si si-chevron-down" />
          </span>
        </React.Fragment>
      }
    >
      {generateTokenTree(props.tokens).map(node => (
        <PermissionNode
          key={`${props.domain}.${node.token.name}`}
          node={node}
          domain={props.domain}
          user={props.user}
          setUserPermission={props.setUserPermission}
        />
      ))}
    </Collapsible>
  </div>
);

DomainPermissionSection.propTypes = {
  domain: PropTypes.number.isRequired,
  tokens: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  setUserPermission: PropTypes.func.isRequired,
};

const makeMapStateToProps = () => (state, { domain }) => {
  const permissionTokensForDomainSelector = makePermissionTokensForDomainSelector();
  return {
    tokens: permissionTokensForDomainSelector(state, { domain }),
  };
};

const withConnect = connect(makeMapStateToProps);

export default compose(withConnect)(DomainPermissionSection);
