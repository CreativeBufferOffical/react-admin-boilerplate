import React from 'react';
import PropTypes from 'prop-types';
import formNames from 'constants/formNames';

import { branch, compose, lifecycle, renderComponent } from 'recompose';
import { connect } from 'react-redux';
import { Container, Alert, Row, Col } from 'reactstrap';
import { MANAGE_ALL } from 'constants/permissionTokens';
import { submit } from 'redux-form/immutable';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import Icon from 'components/Icon';
import RequireUserPermission from 'containers/RequireUserPermission';
import LoadingPage from 'components/LoadingPage';
import ErrorModal from 'components/ErrorModal';
import LoadingSpinner from 'components/LoadingSpinner';

import UserRoleCard from './UserRoleCard';
import UserInfoCard from './UserInfoCard';
import UserGridCard from './UserGridCard';
import UserPermissionCard from './UserPermissionCard';
import reducer from './reducer';
import saga from './saga';
import * as actions from './actions';
import * as selectors from './selectors';

import './styles.scss';
import AddUserModal from '../AddUserModal';

const UserManagementPage = props => {
  const toggleShowDeactivatedUsers = () =>
    props.dispatch(actions.toggleShowDeactivatedUsers());

  const selectUser = userId =>
    props.dispatch(actions.selectUser(userId, props.selectedUserId));

  const activateOrDeactivateUser = user =>
    props.dispatch(actions.activateOrDeactivateUser(user));

  const editUserInfo = () => props.dispatch(actions.setEditingUserInfo(true));

  const cancelEditUserInfo = () =>
    props.dispatch(actions.setEditingUserInfo(false));

  const submitUserInfoForm = () =>
    props.dispatch(submit(formNames.EDITING_USER_FORM(props.selectedUser.id)));

  const loadUserRoles = userId => props.dispatch(actions.loadUserRoles(userId));

  const loadUserPermissions = userId =>
    props.dispatch(actions.loadUserPermissions(userId));

  const setUserPermission = (userId, permissionTokenName, reset, allow) =>
    props.dispatch(
      actions.setUserPermission(userId, permissionTokenName, reset, allow),
    );

  const resetUserPassword = () =>
    props.dispatch(actions.resetUserPassword(props.selectedUser));

  const toggleAddUserModal = () => props.dispatch(actions.toggleAddUserModal());

  return (
    <Container fluid>
      <ErrorModal
        isOpen={!!props.error}
        onClose={() => props.dispatch(actions.clearError())}
        title="Users Error"
        message={props.error}
      />
      <RequireUserPermission
        token={MANAGE_ALL}
        altComponent={
          <Alert color="danger">
            <h4 className="alert-heading">
              <Icon name="alert" /> Insufficient Permissions
            </h4>
            <p>You do not have the correct permissions to view this page.</p>
          </Alert>
        }
      >
        <AddUserModal
          isOpen={props.showingAddUserModal}
          handleToggle={toggleAddUserModal}
        />
        <Row>
          <Col sm={props.selectedUser ? 6 : 12}>
            <UserGridCard
              activeUsers={props.activeUsers}
              toggleShowDeactivatedUsers={toggleShowDeactivatedUsers}
              showingDeactivatedUsers={props.showingDeactivatedUsers}
              selectUser={selectUser}
              selectedUserId={props.selectedUserId}
              selectedUser={props.selectedUser}
              activateOrDeactivateUser={activateOrDeactivateUser}
              resetUserPassword={resetUserPassword}
              loadingResetUserPassword={props.loadingResetUserPassword}
              toggleAddUserModal={toggleAddUserModal}
            />
          </Col>
          {props.selectedUser && (
            <Col sm={6}>
              {props.loadingUser ? (
                <div className="right-side-loader">
                  <LoadingSpinner size={40} />
                </div>
              ) : (
                <React.Fragment>
                  <Row>
                    <Col sm={12}>
                      <UserInfoCard
                        user={props.selectedUser}
                        editing={props.editingUserInfo}
                        editUserInfo={editUserInfo}
                        cancelEditUserInfo={cancelEditUserInfo}
                        submitUserInfoForm={submitUserInfoForm}
                        loadingUpdateUser={props.loadingUpdateUser}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <UserRoleCard
                        user={props.selectedUser}
                        loadUserRoles={loadUserRoles}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm={12}>
                      <UserPermissionCard
                        user={props.selectedUser}
                        loadUserPermissions={loadUserPermissions}
                        setUserPermission={setUserPermission}
                      />
                    </Col>
                  </Row>
                </React.Fragment>
              )}
            </Col>
          )}
        </Row>
      </RequireUserPermission>
    </Container>
  );
};

UserManagementPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  error: PropTypes.string,
  activeUsers: PropTypes.array.isRequired,
  showingDeactivatedUsers: PropTypes.bool.isRequired,
  loadingUser: PropTypes.bool.isRequired,
  selectedUserId: PropTypes.number,
  selectedUser: PropTypes.object,
  editingUserInfo: PropTypes.bool.isRequired,
  loadingResetUserPassword: PropTypes.bool.isRequired,
  showingAddUserModal: PropTypes.bool.isRequired,
  loadingUpdateUser: PropTypes.bool.isRequired,
};

const withReducer = injectReducer({ key: 'userManagementPage', reducer });
const withSaga = injectSaga({ key: 'userManagementPage', saga });
const withConnect = connect(state => ({
  loading: selectors.loading(state),
  error: selectors.error(state),
  activeUsers: selectors.activeUsers(state),
  showingDeactivatedUsers: selectors.showDeactivatedUsers(state),
  loadingUser: selectors.loadingUser(state),
  selectedUserId: selectors.selectedUserId(state),
  selectedUser: selectors.selectedUser(state),
  editingUserInfo: selectors.selectEditingUserInfo(state),
  loadingResetUserPassword: selectors.selectLoadingResetUserPassword(state),
  showingAddUserModal: selectors.selectShowingAddUserModal(state),
  loadingUpdateUser: selectors.selectLoadingUpdateUser(state),
}));
const withLifecycle = lifecycle({
  componentDidMount() {
    this.props.dispatch(actions.usersLoad());
  },
});
const withBranch = branch(props => props.loading, renderComponent(LoadingPage));

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withLifecycle,
  withBranch,
)(UserManagementPage);
