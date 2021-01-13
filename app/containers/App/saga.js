import { all, takeLatest, put, call, fork, join } from 'redux-saga/effects';
import { ProductDomain } from 'constants/domainConstants';
import { mapDomainToObjectFromName } from 'utils/permissionUtils';

import listRoles from 'service/listRoles';
import listPermissionTokens from 'service/listPermissionTokens';

import * as constants from './constants';
import * as actions from './actions';

export default function* appSaga() {
  yield all([takeLatest(constants.APP_INIT_LOAD, appInitialLoader)]);
}

export function* appInitialLoader() {
  const loadUser = yield fork(userLoader);
  const loadRoles = yield fork(roleLoader);
  const loadPermissionTokens = yield fork(permissionTokenLoader);
  yield join(loadUser, loadRoles, loadPermissionTokens);
  yield put(actions.appInitLoadSuccess());
}

export function* userLoader() {
  try {
    const user = window.getLoggedInUser();
    yield put(actions.userLoadSuccess(user));
  } catch (e) {
    yield put(actions.userLoadFail(e.message));
  }
}

export function* roleLoader() {
  try {
    let { roles } = yield call(listRoles, ProductDomain.ALL);
    roles = roles.map(role => mapDomainToObjectFromName(role, role.domain));
    yield put(actions.rolesLoadSuccess(roles));
  } catch (e) {
    yield put(actions.rolesLoadFail(e.message));
  }
}

export function* permissionTokenLoader() {
  try {
    let { permissionTokens } = yield call(
      listPermissionTokens,
      ProductDomain.ALL,
    );
    permissionTokens = permissionTokens.map(permission =>
      mapDomainToObjectFromName(permission, permission.domain),
    );
    yield put(actions.permissionTokensLoadSuccess(permissionTokens));
  } catch (e) {
    yield put(actions.permissionTokensLoadFail(e.message));
  }
}
