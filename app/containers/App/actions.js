import * as actions from './constants';

export const appInitLoad = () => ({
  type: actions.APP_INIT_LOAD,
});

export const appInitLoadSuccess = () => ({
  type: actions.APP_INIT_LOAD_SUCCESS,
});

export const userLoadSuccess = user => ({
  type: actions.USER_LOAD_SUCCESS,
  user,
});

export const userLoadFail = error => ({
  type: actions.USER_LOAD_FAIL,
  error,
});

export const rolesLoadSuccess = roles => ({
  type: actions.ROLES_LOAD_SUCCESS,
  roles,
});

export const rolesLoadFail = error => ({
  type: actions.ROLES_LOAD_FAIL,
  error,
});

export const permissionTokensLoadSuccess = tokens => ({
  type: actions.PERMISSION_TOKENS_LOAD_SUCCESS,
  tokens,
});

export const permissionTokensLoadFail = error => ({
  type: actions.PERMISSION_TOKENS_LOAD_FAIL,
  error,
});
