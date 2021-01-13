import { fromJS, Map } from 'immutable';
import { reduceListByDomain } from 'utils/permissionUtils';
import { ProductDomain } from 'constants/domainConstants';
import { CREATE_USER_SUCCESS } from 'containers/AddUserModal/constants';

import * as constants from './constants';

export const initialState = fromJS({
  loading: true,
  error: null,

  usersById: {},
  selectedUserId: null,
  selectedUser: null,
  loadingUser: false,
  showDeactivatedUsers: false,

  loadingUserRoles: false,
  loadingAddRoleByDomain: {},
  loadingRemoveRoleById: {},
  userRolesByDomain: {},

  loadingUserPermissions: false,
  userPermissionsByTokenName: {},
  permissionsLoadingByTokenName: {},

  loadingResetUserPassword: false,

  editingUserInfo: false,
  loadingUpdateUser: false,
  showingAddUserModal: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.USERS_LOAD_FAIL:
    case constants.ACTIVATE_OR_DEACTIVATE_USER_FAIL:
      return state.set('error', action.error).set('loading', false);

    case constants.CLEAR_ERROR:
      return state.set('error', null);

    case constants.USERS_LOAD_SUCCESS:
      return state
        .set(
          'usersById',
          action.users.reduce(
            (users, user) => users.set(user.id, user),
            new Map(),
          ),
        )
        .set('loading', false);

    case constants.TOGGLE_SHOW_DEACTIVATED_USERS:
      return state.set(
        'showDeactivatedUsers',
        !state.get('showDeactivatedUsers'),
      );

    case constants.SELECT_USER: {
      if (action.userId === state.get('selectedUserId')) {
        return state
          .set('selectedUserId', initialState.get('selectedUserId'))
          .set('selectedUser', initialState.get('selectedUser'))
          .set('editingUserInfo', false)
          .set('loadingUser', false)
          .set('loadingUserRoles', false)
          .set('loadingUserPermissions', false);
      }
      return state
        .set('selectedUserId', action.userId)
        .set('editingUserInfo', false)
        .set('loadingUser', true)
        .set('loadingUserRoles', true)
        .set('loadingUserPermissions', true);
    }
    case constants.USER_LOAD_SUCCESS:
      return state.set('selectedUser', action.user).set('loadingUser', false);
    case constants.USER_LOAD_FAIL:
      return state.set('error', action.error).set('loadingUser', false);

    case constants.ACTIVATE_OR_DEACTIVATE_USER_SUCCESS:
      return state.set(
        'usersById',
        state.get('usersById').set(action.user.id, action.user),
      );

    case constants.LOAD_USER_ROLES:
      return state.set('loadingUserRoles', true);
    case constants.LOAD_USER_ROLES_FAIL:
      return state.set('loadingUserRoles', false).set('error', action.error);
    case constants.LOAD_USER_ROLES_SUCCESS:
      return state
        .set('loadingUserRoles', false)
        .set('userRolesByDomain', reduceListByDomain(action.userRoles));

    case constants.SET_EDITING_USER_INFO:
      return state.set('editingUserInfo', action.editing);

    case constants.UPDATE_USER:
      return state.set('loadingUpdateUser', true);
    case constants.UPDATE_USER_SUCCESS:
      return state
        .set(
          'usersById',
          state.get('usersById').set(action.user.id, action.user),
        )
        .set('editingUserInfo', false)
        .set('loadingUpdateUser', false);
    case constants.UPDATE_USER_FAIL:
      return state.set('error', action.error).set('loadingUpdateUser', false);

    case constants.ASSIGN_USER_ROLE:
      return state.set(
        'loadingAddRoleByDomain',
        state.get('loadingAddRoleByDomain').set(action.domain, true),
      );
    case constants.ASSIGN_USER_ROLE_SUCCESS: {
      return state
        .set(
          'loadingAddRoleByDomain',
          state.get('loadingAddRoleByDomain').set(action.domain, false),
        )
        .setIn(
          ['userRolesByDomain', action.userRole.domain],
          [
            ...state.get('userRolesByDomain').get(action.userRole.domain, []),
            action.userRole,
          ],
        )
        .setIn(
          ['userRolesByDomain', ProductDomain.All],
          [
            ...state.get('userRolesByDomain').get(ProductDomain.All, []),
            action.userRole,
          ],
        );
    }
    case constants.ASSIGN_USER_ROLE_FAIL:
      return state
        .set(
          'loadingAddRoleByDomain',
          state.get('loadingAddRoleByDomain').set(action.domain, false),
        )
        .set('error', action.error);

    case constants.REMOVE_USER_ROLE:
      return state.set(
        'loadingRemoveRoleById',
        state.get('loadingRemoveRoleById').set(action.userRole.id, true),
      );
    case constants.REMOVE_USER_ROLE_SUCCESS: {
      return state
        .set(
          'loadingRemoveRoleById',
          state.get('loadingRemoveRoleById').set(action.userRole.id, false),
        )
        .setIn(
          ['userRolesByDomain', action.userRole.domain],
          state
            .get('userRolesByDomain')
            .get(action.userRole.domain, [])
            .filter(userRole => userRole.id !== action.userRole.id),
        )
        .setIn(
          ['userRolesByDomain', ProductDomain.All],
          state
            .get('userRolesByDomain')
            .get(ProductDomain.All, [])
            .filter(userRole => userRole.id !== action.userRole.id),
        );
    }
    case constants.REMOVE_USER_ROLE_FAIL:
      return state
        .set(
          'loadingRemoveRoleById',
          state.get('loadingRemoveRoleById').set(action.userRole.id, false),
        )
        .set('error', action.error);

    case constants.LOAD_USER_PERMISSIONS:
      return state.set('loadingUserPermissions', true);
    case constants.LOAD_USER_PERMISSIONS_SUCCESS:
      return state
        .set(
          'userPermissionsByTokenName',
          action.permissions.reduce(
            (userPermissionsByTokenName, permission) =>
              userPermissionsByTokenName.set(
                permission.permissionTokenName,
                permission,
              ),
            new Map(),
          ),
        )
        .set('loadingUserPermissions', false);
    case constants.LOAD_USER_PERMISSIONS_FAIL:
      return state
        .set('loadingUserPermissions', false)
        .set('error', action.error);

    case constants.SET_USER_PERMISSION:
      return state.set(
        'permissionsLoadingByTokenName',
        state
          .get('permissionsLoadingByTokenName')
          .set(action.permissionTokenName, true),
      );
    case constants.SET_USER_PERMISSION_SUCCESS:
      return state.set(
        'permissionsLoadingByTokenName',
        state
          .get('permissionsLoadingByTokenName')
          .set(action.permissionTokenName, false),
      );
    case constants.SET_USER_PERMISSION_FAIL:
      return state
        .set(
          'permissionsLoadingByTokenName',
          state
            .get('permissionsLoadingByTokenName')
            .set(action.permissionTokenName, false),
        )
        .set('error', action.error);

    case constants.RESET_USER_PASSWORD:
      return state.set('loadingResetUserPassword', true);
    case constants.RESET_USER_PASSWORD_SUCCESS:
      return state.set('loadingResetUserPassword', false);
    case constants.RESET_USER_PASSWORD_FAIL:
      return state
        .set('loadingResetUserPassword', false)
        .set('error', action.error);

    case constants.TOGGLE_ADD_USER_MODAL:
      return state.set(
        'showingAddUserModal',
        !state.get('showingAddUserModal'),
      );

    case CREATE_USER_SUCCESS:
      return state
        .set('showingAddUserModal', false)
        .set(
          'usersById',
          state.get('usersById').set(action.user.id, action.user),
        );

    default:
      return state;
  }
}
