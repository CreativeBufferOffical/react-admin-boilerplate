import React from 'react';
import PropTypes from 'prop-types';

import { MANAGE_ALL_ADD_REMOVE } from 'constants/permissionTokens';
import { formatDateMMDDYYYY } from 'utils/dateUtils';
import { Grid, GridColumn as Column } from '@progress/kendo-react-grid';
import { Button } from 'reactstrap';

import RequireUserPermission from 'containers/RequireUserPermission';
import Icon from 'components/Icon';
import StandardCard from 'components/StandardCard';
import LoadingButton from 'components/LoadingButton';

const UserGridCard = props => (
  <StandardCard
    title="Active Users"
    footer={
      <div>
        <RequireUserPermission token={MANAGE_ALL_ADD_REMOVE}>
          <Button
            color="success mr-3"
            size="sm"
            onClick={props.toggleAddUserModal}
          >
            <Icon name="add" /> Add User
          </Button>
        </RequireUserPermission>
        <Button
          color="primary"
          size="sm"
          onClick={props.toggleShowDeactivatedUsers}
        >
          {props.showingDeactivatedUsers
            ? 'Hide Deactivated Users'
            : 'Show Deactivated Users'}
        </Button>
        {props.selectedUserId && (
          <React.Fragment>
            <RequireUserPermission token={MANAGE_ALL_ADD_REMOVE}>
              <Button
                color={
                  props.selectedUser && props.selectedUser.active
                    ? 'danger'
                    : 'success'
                }
                className="float-right"
                size="sm"
                onClick={() =>
                  props.activateOrDeactivateUser(props.selectedUser)
                }
              >
                {props.selectedUser && props.selectedUser.active
                  ? 'Deactivate User'
                  : 'Activate User'}
              </Button>
            </RequireUserPermission>
            <LoadingButton
              className="float-right mr-3"
              text="Reset Password"
              onClick={props.resetUserPassword}
              loading={props.loadingResetUserPassword}
            />
          </React.Fragment>
        )}
      </div>
    }
  >
    <Grid
      style={{ maxHeight: 615 }}
      data={props.activeUsers.map(user => ({
        ...user,
        selected: user.id === props.selectedUserId,
      }))}
      selectedField="selected"
      onRowClick={e => {
        props.selectUser(e.dataItem.id);
      }}
    >
      <Column
        field="name"
        title="Name"
        cell={({ dataItem }) => (
          <td>{`${dataItem.firstName} ${dataItem.lastName}`}</td>
        )}
      />
      <Column field="email" title="Email" />
      <Column
        field="created"
        title="Date Created"
        cell={({ dataItem, field }) => (
          <td>{formatDateMMDDYYYY(dataItem[field])}</td>
        )}
      />
      <Column
        field="active"
        title="Active"
        width="80px"
        cell={({ dataItem, field }) => (
          <td className={dataItem[field] ? 'fslso-celery' : 'road-red'}>
            {dataItem[field] ? 'True' : 'False'}
          </td>
        )}
      />
    </Grid>
  </StandardCard>
);

UserGridCard.propTypes = {
  activeUsers: PropTypes.array.isRequired,
  toggleShowDeactivatedUsers: PropTypes.func,
  showingDeactivatedUsers: PropTypes.bool.isRequired,
  selectUser: PropTypes.func.isRequired,
  selectedUserId: PropTypes.number,
  selectedUser: PropTypes.object,
  activateOrDeactivateUser: PropTypes.func.isRequired,
  resetUserPassword: PropTypes.func.isRequired,
  loadingResetUserPassword: PropTypes.bool.isRequired,
  toggleAddUserModal: PropTypes.func.isRequired,
};

export default UserGridCard;
