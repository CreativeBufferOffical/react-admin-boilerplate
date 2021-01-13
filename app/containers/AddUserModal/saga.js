import { all, takeLatest, put, call } from 'redux-saga/effects';
import { confirmationModalSaga } from 'containers/ConfirmationModal/saga';
import { ModalMessages } from 'constants/modalConstants';

import createUser from 'service/createUser';

import * as constants from './constants';
import * as actions from './actions';

export default function* addUserModalSaga() {
  yield all([takeLatest(constants.CREATE_USER, createUserSaga)]);
}

export function* createUserSaga({ user }) {
  try {
    const confirm = yield call(
      confirmationModalSaga,
      ModalMessages.CREATE_USER,
    );
    if (!confirm) {
      yield put(actions.setLoading(false));
      return;
    }
    const newUer = yield call(createUser, user);
    yield put(actions.createUserSuccess(newUer));
  } catch (e) {
    yield put(actions.createUserFail(e.message));
  }
}
