/*
 *
 * App reducer
 *
 */

import { fromJS, Map } from 'immutable';
import { reduceListByDomain } from 'utils/permissionUtils';
import * as constants from './constants';

export const initialState = fromJS({
  user: null,
  userLoading: true,
  userError: null,
  permissionsByName: {},
  rolesByDomain: {},
  rolesByName: {},
  permissionTokensByDomain: {},
  permissionTokensByName: {},
  appLoading: true,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.APP_INIT_LOAD:
      return state
        .set('user', null)
        .set('userLoading', true)
        .set('userError', null);
    case constants.APP_INIT_LOAD_SUCCESS:
      return state.set('appLoading', false);

    case constants.USER_LOAD_SUCCESS:
      return state
        .set('userLoading', false)
        .set(
          'user',
          new Map()
            .set('id', action.user.id)
            .set('firstName', action.user.firstName)
            .set('lastName', action.user.lastName)
            .set('email', action.user.email),
        )
        .set(
          'permissionsByName',
          action.user.permissions.reduce(
            (perms, perm) => perms.set(perm, true),
            new Map(),
          ),
        );

    case constants.USER_LOAD_FAIL:
      return state.set('userLoading', false).set('userError', action.error);

    case constants.ROLES_LOAD_SUCCESS:
      return state
        .set('rolesByDomain', reduceListByDomain(action.roles))
        .set(
          'rolesByName',
          action.roles.reduce(
            (rolesByName, role) => rolesByName.set(role.roleName, role),
            new Map(),
          ),
        );

    case constants.PERMISSION_TOKENS_LOAD_SUCCESS:
      return state
        .set('permissionTokensByDomain', reduceListByDomain(action.tokens))
        .set(
          'permissionTokensByName',
          action.tokens.reduce(
            (permissionTokensByName, token) =>
              permissionTokensByName.set(token.name, token),
            new Map(),
          ),
        );

    default:
      return state;
  }
}
