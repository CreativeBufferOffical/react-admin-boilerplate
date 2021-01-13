import { createSelector } from 'reselect';
import { ProductDomain } from 'constants/domainConstants';

const selectApp = state => state.get('app');

const selectPermissionsByName = createSelector(selectApp, state =>
  state.get('permissionsByName'),
);

export const selectPermissions = createSelector(
  selectPermissionsByName,
  permissionsByName => permissionsByName.keySeq().toArray(),
);

export const appLoading = createSelector(selectApp, state =>
  state.get('appLoading'),
);

export const userLoading = createSelector(selectApp, state =>
  state.get('userLoading'),
);

const selectRolesByDomain = createSelector(selectApp, state =>
  state.get('rolesByDomain'),
);

export const selectRolesByName = createSelector(selectApp, state =>
  state.get('rolesByName'),
);

export const selectDomainsWithRoles = createSelector(
  selectRolesByDomain,
  state =>
    state
      .keySeq()
      .toArray()
      .sort((a, b) => (a > b ? 1 : -1)),
);

const makeRolesForDomainSelector = () =>
  createSelector(
    [selectRolesByDomain, (_, { domain }) => domain],
    (rolesByDomain, domain) => rolesByDomain.get(domain),
  );

export const makeRoleOptions = () => {
  const rolesForDomainSelector = makeRolesForDomainSelector();
  return createSelector([rolesForDomainSelector], roles => {
    const options = roles.map(role => ({
      id: role.id,
      value: role.roleName,
      label: role.roleName,
    }));
    options.unshift({ id: -1, value: -1, label: 'Select a role' });
    return options;
  });
};

export const makeRoleOptionsWithFilteredUserRoles = () => {
  const roleOptionsSelector = makeRoleOptions();
  return createSelector(
    [roleOptionsSelector, (_, { userRoles }) => userRoles],
    (roleOptions, userRoles) =>
      roleOptions.filter(
        option =>
          userRoles.findIndex(
            userRole => userRole.roleName === option.value,
          ) === -1,
      ),
  );
};

const selectPermissionTokensByDomain = createSelector(selectApp, state =>
  state.get('permissionTokensByDomain'),
);

export const selectDomainsWithPermissionTokens = createSelector(
  selectPermissionTokensByDomain,
  state =>
    state
      .keySeq()
      .toArray()
      .filter(domain => domain !== ProductDomain.All)
      .sort((a, b) => (a > b ? 1 : -1)),
);

export const makePermissionTokensForDomainSelector = () =>
  createSelector(
    [selectPermissionTokensByDomain, (_, { domain }) => domain],
    (permissionTokensByDomain, domain) => permissionTokensByDomain.get(domain),
  );
