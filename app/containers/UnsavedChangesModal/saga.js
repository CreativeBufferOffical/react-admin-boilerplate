import { take, race, put } from 'redux-saga/effects';

import * as constants from './constants';
import * as actions from './actions';

export function* unsavedChangesModalSaga() {
  yield put(actions.openUnsavedChangesModal());

  const response = yield race({
    accept: take(constants.ACCEPT_UNSAVED_CHANGES_MODAL),
    discard: take(constants.DISCARD_UNSAVED_CHANGES_MODAL),
    cancel: take(constants.CANCEL_UNSAVED_CHANGES_MODAL),
  });

  if (response.cancel) return null;

  return !!response.accept;
}
