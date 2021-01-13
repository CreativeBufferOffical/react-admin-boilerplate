import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { setPropTypes } from 'recompose';
import {
  makeRoleOptions,
  makeRoleOptionsWithFilteredUserRoles,
} from 'containers/App/selectors';
import PropTypes from 'prop-types';
import SelectDropDown from 'components/SelectDropDown';
import { fieldInputPropTypes } from 'redux-form/immutable';

function RoleSelect({ input, className, roleOptions }) {
  return (
    <SelectDropDown input={input} className={className} options={roleOptions} />
  );
}

RoleSelect.propTypes = {
  input: PropTypes.shape(fieldInputPropTypes).isRequired,
  className: PropTypes.string,
  roleOptions: PropTypes.array,
};

const withPropTypes = setPropTypes({
  userRoles: PropTypes.array,
  domain: PropTypes.number.isRequired,
});

const makeMapStateToProps = () => (state, { domain, userRoles }) => {
  const roleOptionsSelector = userRoles
    ? makeRoleOptionsWithFilteredUserRoles()
    : makeRoleOptions();
  return {
    roleOptions: roleOptionsSelector(state, { domain, userRoles }),
  };
};

const withConnect = connect(makeMapStateToProps);

export default compose(
  withPropTypes,
  withConnect,
)(RoleSelect);
