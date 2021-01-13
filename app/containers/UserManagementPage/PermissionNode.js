import React from 'react';
import PropTypes from 'prop-types';
import Collapsible from 'react-collapsible';

import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Button } from 'reactstrap';
import { userHasPermissionToken } from 'utils/permissionUtils';

import LoadingSpinner from 'components/LoadingSpinner';

import {
  makeUserPermissionSelector,
  makePermissionLoadingSelector,
} from './selectors';

const PermissionNode = ({
  node,
  domain,
  user,
  userPermission,
  setUserPermission,
  loading,
}) => {
  const rootNode = node.depth === 0;
  const hasChildren = node.children.length > 0;
  const collapseClassName = `token-node ${rootNode ? 'root-node' : ''} ${
    !hasChildren ? 'leaf-node' : ''
  }`;
  const tokenName = node.token.name;
  const isDefaultState = !userPermission;
  const isAllowed = userHasPermissionToken(user, tokenName);
  const isDisallowed = !userHasPermissionToken(user, tokenName);

  return (
    <Collapsible
      open
      className={collapseClassName}
      openedClassName={collapseClassName}
      trigger={
        <div className="node-info">
          <div className="node-text">
            <span>{node.token.name}</span>
            <span className="description">{node.token.description}</span>
          </div>
          <div className="node-actions">
            <Button
              outline={!isAllowed || loading}
              color="success mr-1"
              className=""
              size="sm"
              onClick={ev => {
                ev.stopPropagation();
                setUserPermission(user.id, node.token.name, false, true);
              }}
              disabled={loading}
            >
              {loading ? <LoadingSpinner size={20} /> : 'Allow'}
            </Button>
            <Button
              outline={!isDefaultState || loading}
              color="primary mr-1"
              className=""
              size="sm"
              onClick={ev => {
                ev.stopPropagation();
                setUserPermission(user.id, node.token.name, true);
              }}
              disabled={loading}
            >
              {loading ? <LoadingSpinner size={20} /> : 'Default'}
            </Button>
            <Button
              outline={!isDisallowed || loading}
              color="danger mr-1"
              className=""
              size="sm"
              onClick={ev => {
                ev.stopPropagation();
                setUserPermission(user.id, node.token.name, false, false);
              }}
              disabled={loading}
            >
              {loading ? <LoadingSpinner size={20} /> : 'Disallow'}
            </Button>
          </div>
          {hasChildren && (
            <span className="collapsible-icon">
              <span className="si si-chevron-down" />
            </span>
          )}
        </div>
      }
    >
      {node.children.map(childNode => (
        <ComposedPermissionNode
          key={`${domain}.${childNode.token.name}`}
          node={childNode}
          domain={domain}
          user={user}
          setUserPermission={setUserPermission}
        />
      ))}
    </Collapsible>
  );
};

PermissionNode.propTypes = {
  node: PropTypes.object.isRequired,
  domain: PropTypes.number.isRequired,
  user: PropTypes.object.isRequired,
  userPermission: PropTypes.object,
  setUserPermission: PropTypes.func.isRequired,
  loading: PropTypes.bool,
};

const withConnect = connect((state, props) => {
  const userPermissionSelector = makeUserPermissionSelector();
  const loadingSelector = makePermissionLoadingSelector();
  return {
    userPermission: userPermissionSelector(state, props.node.token.id),
    loading: loadingSelector(state, props.node.token.id),
  };
});

const ComposedPermissionNode = compose(withConnect)(PermissionNode);
export default ComposedPermissionNode;
