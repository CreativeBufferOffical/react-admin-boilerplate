import * as constants from './constants';

export const usersLoad = () => ({
  type: constants.USERS_LOAD,
});

export const usersLoadSuccess = users => ({
  type: constants.USERS_LOAD_SUCCESS,
  users,
});

export const usersLoadFail = error => ({
  type: constants.USERS_LOAD_FAIL,
  error,
});

export const userLoadSuccess = user => ({
  type: constants.USER_LOAD_SUCCESS,
  user,
});

export const userLoadFail = error => ({
  type: constants.USER_LOAD_FAIL,
  error,
});

export const clearError = () => ({
  type: constants.CLEAR_ERROR,
});

export const toggleShowDeactivatedUsers = () => ({
  type: constants.TOGGLE_SHOW_DEACTIVATED_USERS,
});

export const selectUser = (userId, selectedUserId) => ({
  type: constants.SELECT_USER,
  userId,
  selectedUserId,
});

export const activateOrDeactivateUser = user => ({
  type: constants.ACTIVATE_OR_DEACTIVATE_USER,
  user,
});

export const activateOrDeactivateUserSuccess = user => ({
  type: constants.ACTIVATE_OR_DEACTIVATE_USER_SUCCESS,
  user,
});

export const activateOrDeactivateUserFail = error => ({
  type: constants.ACTIVATE_OR_DEACTIVATE_USER_FAIL,
  error,
});

export const loadUserRoles = userId => ({
  type: constants.LOAD_USER_ROLES,
  userId,
});

export const loadUserRolesSuccess = userRoles => ({
  type: constants.LOAD_USER_ROLES_SUCCESS,
  userRoles,
});

export const loadUserRolesFail = error => ({
  type: constants.LOAD_USER_ROLES_FAIL,
  error,
});

export const setEditingUserInfo = editing => ({
  type: constants.SET_EDITING_USER_INFO,
  editing,
});

export const updateUser = user => ({
  type: constants.UPDATE_USER,
  user,
});

export const updateUserSuccess = user => ({
  type: constants.UPDATE_USER_SUCCESS,
  user,
});

export const updateUserFail = () => ({
  type: constants.UPDATE_USER_FAIL,
});

export const assignUserRole = (userId, roleName, domain) => ({
  type: constants.ASSIGN_USER_ROLE,
  userId,
  roleName,
  domain,
});

export const assignUserRoleSuccess = (userRole, domain) => ({
  type: constants.ASSIGN_USER_ROLE_SUCCESS,
  userRole,
  domain,
});

export const assignUserRoleFail = (error, domain) => ({
  type: constants.ASSIGN_USER_ROLE_FAIL,
  error,
  domain,
});

export const removeUserRole = userRole => ({
  type: constants.REMOVE_USER_ROLE,
  userRole,
});

export const removeUserRoleSuccess = userRole => ({
  type: constants.REMOVE_USER_ROLE_SUCCESS,
  userRole,
});

export const removeUserRoleFail = (error, userRole) => ({
  type: constants.REMOVE_USER_ROLE_FAIL,
  error,
  userRole,
});

export const loadUserPermissions = userId => ({
  type: constants.LOAD_USER_PERMISSIONS,
  userId,
});

export const loadUserPermissionsSuccess = permissions => ({
  type: constants.LOAD_USER_PERMISSIONS_SUCCESS,
  permissions,
});

export const loadUserPermissionsFail = error => ({
  type: constants.LOAD_USER_PERMISSIONS_FAIL,
  error,
});

export const setUserPermission = (
  userId,
  permissionTokenName,
  reset,
  allow,
) => ({
  type: constants.SET_USER_PERMISSION,
  userId,
  permissionTokenName,
  reset,
  allow,
});

export const setUserPermissionSuccess = permissionTokenName => ({
  type: constants.SET_USER_PERMISSION_SUCCESS,
  permissionTokenName,
});

export const setUserPermissionFail = (error, permissionTokenName) => ({
  type: constants.SET_USER_PERMISSION_FAIL,
  error,
  permissionTokenName,
});

export const resetUserPassword = user => ({
  type: constants.RESET_USER_PASSWORD,
  user,
});

export const resetUserPasswordSuccess = userId => ({
  type: constants.RESET_USER_PASSWORD_SUCCESS,
  userId,
});

export const resetUserPasswordFail = error => ({
  type: constants.RESET_USER_PASSWORD_FAIL,
  error,
});

export const toggleAddUserModal = () => ({
  type: constants.TOGGLE_ADD_USER_MODAL,
});
