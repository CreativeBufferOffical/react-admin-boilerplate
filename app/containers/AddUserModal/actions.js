import * as constants from './constants';

export const createUser = user => ({
  type: constants.CREATE_USER,
  user,
});

export const createUserSuccess = user => ({
  type: constants.CREATE_USER_SUCCESS,
  user,
});

export const createUserFail = error => ({
  type: constants.CREATE_USER_FAIL,
  error,
});

export const clearError = () => ({
  type: constants.CLEAR_ERROR,
});

export const setLoading = value => ({
  type: constants.SET_LOADING,
  value,
});
