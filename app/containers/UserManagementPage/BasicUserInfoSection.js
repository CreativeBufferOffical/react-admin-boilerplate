import React from 'react';
import PropTypes from 'prop-types';
import formNames from 'constants/formNames';

import BasicUserForm from 'components/BasicUserForm';
import BasicUserInfo from './BasicUserInfo';

import { updateUser } from './actions';

const BasicUserInfoSection = props =>
  props.editing ? (
    <BasicUserForm
      user={props.user}
      onSubmitAction={updateUser}
      form={formNames.EDITING_USER_FORM(props.user.id)}
      initialValues={props.user}
    />
  ) : (
    <BasicUserInfo user={props.user} />
  );

BasicUserInfoSection.propTypes = {
  user: PropTypes.object.isRequired,
  editing: PropTypes.bool.isRequired,
};

export default BasicUserInfoSection;
