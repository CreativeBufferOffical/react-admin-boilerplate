import React from 'react';
import PropTypes from 'prop-types';

import { reduxForm, Field } from 'redux-form/immutable';
import { compose } from 'recompose';
import { connect } from 'react-redux';
import { ProductDomainShortNames } from 'constants/domainConstants';

import IconButton from 'components/IconButton';
import ValueField from 'components/ValueField';
import RoleSelect from 'containers/RoleSelect';
import LoadingSpinner from 'components/LoadingSpinner';

import * as selectors from './selectors';
import * as actions from './actions';

const DomainRoleSection = props => (
  <form onSubmit={props.handleSubmit(props.submit)}>
    <div className="role-section">
      <ValueField
        label={`${ProductDomainShortNames[props.domain]} Roles`}
        loading={props.loadingAddingRole}
        value={
          <div className="role-add-form">
            <Field
              name="roleName"
              component={RoleSelect}
              userRoles={props.userRoles}
              domain={props.domain}
            />
            <IconButton
              type="submit"
              name="add"
              className="fslso-celery float-right"
              fontSize="16px"
            />
          </div>
        }
      />
      <div className="user-roles">
        {props.userRoles &&
          props.userRoles.map(userRole => (
            <div
              key={`${userRole.domain}.${userRole.id}`}
              className="role-item"
            >
              {userRole.roleName}
              {props.loadingRemoveRoleById.get(userRole.id) ? (
                <LoadingSpinner size={20} />
              ) : (
                <IconButton
                  name="trash"
                  className="ml-3 road-red"
                  fontSize="16px"
                  onClick={() =>
                    props.dispatch(actions.removeUserRole(userRole))
                  }
                />
              )}
            </div>
          ))}
        {displayNoRoles(props.userRoles) && (
          <div className="role-item empty font-italic">No roles assigned</div>
        )}
      </div>
    </div>
  </form>
);
const displayNoRoles = userRoles => !userRoles || userRoles.length <= 0;

DomainRoleSection.propTypes = {
  dispatch: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  submit: PropTypes.func,
  domain: PropTypes.number.isRequired,
  userRoles: PropTypes.array,
  loadingAddingRole: PropTypes.bool,
  loadingRemoveRoleById: PropTypes.object.isRequired,
};

const makeMapStateToProps = (state, { domain }) => {
  const userRolesForDomainSelector = selectors.makeUserRolesForDomainSelector();
  const loadingAddingRoleSelector = selectors.makeLoadingAddRoleByDomainSelector();
  return {
    userRoles: userRolesForDomainSelector(state, domain),
    loadingAddingRole: loadingAddingRoleSelector(state, domain),
    loadingRemoveRoleById: selectors.selectLoadingRemoveRoleById(state),
  };
};

const withConnect = connect(makeMapStateToProps);
const withForm = reduxForm({
  onSubmit(values, dispatch, props) {
    const roleName = values.get('roleName');
    if (roleName && roleName !== '-1')
      dispatch(
        actions.assignUserRole(
          props.userId,
          values.get('roleName'),
          props.domain,
        ),
      );
  },
});

export default compose(
  withConnect,
  withForm,
)(DomainRoleSection);
