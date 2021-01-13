import React from 'react';
import PropTypes from 'prop-types';

import { Button } from 'reactstrap';
import { ButtonColors } from 'constants/buttonConstants';

import StandardCard from 'components/StandardCard';
import IconButton from 'components/IconButton';
import LoadingButton from 'components/LoadingButton';

import BasicUserInfoSection from './BasicUserInfoSection';

const UserInfoCard = props => (
  <StandardCard
    title={
      <div>
        {`${props.user.firstName} ${props.user.lastName}`}
        {!props.editing && (
          <IconButton
            name="edit"
            className="fslso-blue float-right"
            onClick={props.editUserInfo}
          />
        )}
      </div>
    }
    footer={
      props.editing && (
        <React.Fragment>
          <Button
            color="secondary"
            className="float-right"
            size="sm"
            outline
            onClick={props.cancelEditUserInfo}
          >
            Cancel
          </Button>
          <LoadingButton
            className="float-right mr-2"
            text="Save"
            iconName="save"
            color={ButtonColors.SUCCESS}
            onClick={props.submitUserInfoForm}
            loading={props.loadingUpdateUser}
          />
        </React.Fragment>
      )
    }
  >
    <div className="p-4">
      <BasicUserInfoSection editing={props.editing} user={props.user} />
    </div>
  </StandardCard>
);

UserInfoCard.propTypes = {
  user: PropTypes.object,
  editing: PropTypes.bool.isRequired,
  editUserInfo: PropTypes.func.isRequired,
  cancelEditUserInfo: PropTypes.func.isRequired,
  submitUserInfoForm: PropTypes.func.isRequired,
  loadingUpdateUser: PropTypes.bool.isRequired,
};

export default UserInfoCard;
