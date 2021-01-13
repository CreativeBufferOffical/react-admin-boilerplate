import { createSelector } from 'reselect';

const sortByName = (a, b) => {
  const nameA = a.firstName.toUpperCase();
  const nameB = b.firstName.toUpperCase();
  if (nameA < nameB) {
    return -1;
  }

  if (nameA > nameB) {
    return 1;
  }

  return 0;
};

const selectUserManagementPage = state => state.get('userManagementPage');

export const userById = createSelector(selectUserManagementPage, state =>
  state.get('usersById').sort(sortByName),
);

export const loading = createSelector(selectUserManagementPage, state =>
  state.get('loading'),
);

export const error = createSelector(selectUserManagementPage, state =>
  state.get('error'),
);

export const selectedUserId = createSelector(selectUserManagementPage, state =>
  state.get('selectedUserId'),
);

export const showDeactivatedUsers = createSelector(
  selectUserManagementPage,
  state => state.get('showDeactivatedUsers'),
);

export const selectLoadingUserRoles = createSelector(
  selectUserManagementPage,
  state => state.get('loadingUserRoles'),
);

const selectUserRolesByDomain = createSelector(
  selectUserManagementPage,
  state => state.get('userRolesByDomain'),
);

export const makeUserRolesForDomainSelector = () =>
  createSelector(
    [selectUserRolesByDomain, (_, domain) => domain],
    (userRolesByDomain, domain) => userRolesByDomain.get(domain),
  );

export const activeUsers = createSelector(
  [userById, showDeactivatedUsers],
  (users, showDeactivated) =>
    users
      .valueSeq()
      .toArray()
      .filter(u => showDeactivated || u.active),
);

export const loadingUser = createSelector(selectUserManagementPage, state =>
  state.get('loadingUser'),
);

export const selectedUser = createSelector(selectUserManagementPage, state =>
  state.get('selectedUser'),
);

export const selectEditingUserInfo = createSelector(
  selectUserManagementPage,
  state => state.get('editingUserInfo'),
);

export const selectLoadingUserPermissions = createSelector(
  selectUserManagementPage,
  state => state.get('loadingUserPermissions'),
);

const selectUserPermissionsByTokenName = createSelector(
  selectUserManagementPage,
  state => state.get('userPermissionsByTokenName'),
);

export const makeUserPermissionSelector = () =>
  createSelector(
    [selectUserPermissionsByTokenName, (_, tokenName) => tokenName],
    (userPermissionsByTokenName, tokenName) =>
      userPermissionsByTokenName.get(tokenName),
  );

const selectPermissionsLoadingByTokenName = createSelector(
  selectUserManagementPage,
  state => state.get('permissionsLoadingByTokenName'),
);

export const makePermissionLoadingSelector = () =>
  createSelector(
    [selectPermissionsLoadingByTokenName, (_, tokenName) => tokenName],
    (permissionsLoadingByTokenName, tokenName) =>
      permissionsLoadingByTokenName.get(tokenName),
  );

const selectLoadingAddRoleByDomain = createSelector(
  selectUserManagementPage,
  state => state.get('loadingAddRoleByDomain'),
);

export const makeLoadingAddRoleByDomainSelector = () =>
  createSelector(
    [selectLoadingAddRoleByDomain, (_, domain) => domain],
    (loadingAddRoleByDomain, domain) => loadingAddRoleByDomain.get(domain),
  );

export const selectLoadingRemoveRoleById = createSelector(
  selectUserManagementPage,
  state => state.get('loadingRemoveRoleById'),
);

export const selectLoadingResetUserPassword = createSelector(
  selectUserManagementPage,
  state => state.get('loadingResetUserPassword'),
);

export const selectShowingAddUserModal = createSelector(
  selectUserManagementPage,
  state => state.get('showingAddUserModal'),
);

export const selectLoadingUpdateUser = createSelector(
  selectUserManagementPage,
  state => state.get('loadingUpdateUser'),
);
