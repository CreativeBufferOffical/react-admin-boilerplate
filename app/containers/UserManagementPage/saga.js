import {
  all,
  takeEvery,
  takeLatest,
  put,
  call,
  select,
} from 'redux-saga/effects';
import { confirmationModalSaga } from 'containers/ConfirmationModal/saga';
import { ModalMessages } from 'constants/modalConstants';
import { ProductDomain } from 'constants/domainConstants';
import {
  filterAndMapDomainToUserRoles,
  mapDomainToObject,
} from 'utils/permissionUtils';
import { selectRolesByName } from 'containers/App/selectors';

import listUsers from 'service/listUsers';
import getUser from 'service/getUser';
import toggleUserActive from 'service/toggleUserActive';
import listUserRoles from 'service/listUserRoles';
import listUserPermissions from 'service/listUserPermissions';
import listEffectivePermissions from 'service/listEffectivePermissions';
import updateUser from 'service/updateUser';
import assignUserRole from 'service/assignUserRole';
import removeUserRole from 'service/removeUserRole';
import allowUserPermission from 'service/allowUserPermission';
import denyUserPermission from 'service/denyUserPermission';
import resetUserPermission from 'service/resetUserPermission';
import resetUserPassword from 'service/adminResetUserPassword';

import * as constants from './constants';
import * as actions from './actions';

export default function* userManagementPageSaga() {
  yield all([
    takeLatest(constants.USERS_LOAD, usersLoader),
    takeLatest(constants.SELECT_USER, userLoader),
    takeLatest(constants.ACTIVATE_OR_DEACTIVATE_USER, activateOrDeactivateUser),
    takeLatest(constants.LOAD_USER_ROLES, userRolesLoader),
    takeLatest(constants.UPDATE_USER, updateUserSaga),
    takeEvery(constants.ASSIGN_USER_ROLE, assignUserRoleSaga),
    takeEvery(constants.REMOVE_USER_ROLE, removeUserRoleSaga),
    takeLatest(constants.LOAD_USER_PERMISSIONS, userPermissionsLoader),
    takeEvery(constants.SET_USER_PERMISSION, setUserPermissionSaga),
    takeLatest(constants.RESET_USER_PASSWORD, resetUserPasswordSaga),
  ]);
}

export function* usersLoader() {
  try {
    yield put(
      actions.usersLoadSuccess(
        yield call(listUsers, {
          start: 0,
          count: 99999,
        }),
      ),
    );
  } catch (e) {
    yield put(actions.usersLoadFail(e.message));
  }
}

export function* userLoader({ userId, selectedUserId }) {
  try {
    if (userId === selectedUserId) return;
    const user = yield call(getUser, userId);
    const { permissions } = yield call(listEffectivePermissions, {
      userId,
      domain: ProductDomain.All,
    });
    user.permissions = permissions;
    yield put(actions.userLoadSuccess(user));
  } catch (e) {
    yield put(actions.userLoadFail(e.message));
  }
}

export function* activateOrDeactivateUser({ user }) {
  try {
    const { active } = user;
    const confirm = yield call(
      confirmationModalSaga,
      active
        ? ModalMessages.DEACTIVATE_USER_TEXT(user)
        : ModalMessages.ACTIVATE_USER_TEXT(user),
    );
    if (!confirm) return;
    const result = yield call(toggleUserActive, user);
    yield put(actions.activateOrDeactivateUserSuccess(result));
  } catch (e) {
    yield put(actions.activateOrDeactivateUserFail(e.message));
  }
}

export function* userRolesLoader({ userId }) {
  try {
    let { userRoles } = yield call(listUserRoles, {
      userId,
      domain: ProductDomain.All,
    });
    const rolesByName = yield select(selectRolesByName);
    userRoles = filterAndMapDomainToUserRoles(rolesByName, userRoles);
    yield put(actions.loadUserRolesSuccess(userRoles));
  } catch (e) {
    yield put(actions.loadUserRolesFail(e.message));
  }
}

export function* updateUserSaga({ user }) {
  try {
    const response = yield call(updateUser, user);
    yield put(actions.updateUserSuccess(response));
  } catch (e) {
    yield put(actions.updateUserFail(e.message));
  }
}

export function* assignUserRoleSaga({ userId, roleName, domain }) {
  try {
    let userRole = yield call(assignUserRole, { userId, roleName });
    const rolesByName = yield select(selectRolesByName);
    userRole = mapDomainToObject(
      userRole,
      rolesByName.get(userRole.roleName).domain,
    );

    yield call(userPermissionsLoader, { userId });
    yield call(userLoader, { userId });

    yield put(actions.assignUserRoleSuccess(userRole, domain));
  } catch (e) {
    yield put(actions.assignUserRoleFail(e.message, domain));
  }
}

export function* removeUserRoleSaga({ userRole }) {
  try {
    yield call(removeUserRole, {
      userId: userRole.userId,
      userRoleId: userRole.id,
    });

    yield call(userPermissionsLoader, { userId: userRole.userId });
    yield call(userLoader, { userId: userRole.userId });

    yield put(actions.removeUserRoleSuccess(userRole));
  } catch (e) {
    yield put(actions.removeUserRoleFail(e.message, userRole));
  }
}

export function* userPermissionsLoader({ userId }) {
  try {
    const { permissions } = yield call(listUserPermissions, {
      userId,
      domain: ProductDomain.All,
    });
    yield put(actions.loadUserPermissionsSuccess(permissions));
  } catch (e) {
    yield put(actions.loadUserPermissionsFail(e.message));
  }
}

export function* setUserPermissionSaga({
  userId,
  permissionTokenName,
  reset,
  allow,
}) {
  try {
    const req = {
      userId,
      permissionTokenName,
    };
    if (reset) yield call(resetUserPermission, req);
    else if (allow) yield call(allowUserPermission, req);
    else yield call(denyUserPermission, req);

    yield call(userPermissionsLoader, { userId });
    yield call(userLoader, { userId });

    yield put(actions.setUserPermissionSuccess(permissionTokenName));
  } catch (e) {
    yield put(actions.setUserPermissionFail(e.message, permissionTokenName));
  }
}

export function* resetUserPasswordSaga({ user }) {
  try {
    const { userId } = yield call(resetUserPassword, {
      userId: user.id,
    });
    yield put(actions.resetUserPasswordSuccess(userId));
  } catch (e) {
    yield put(actions.resetUserPasswordFail(e.message));
  }
}
