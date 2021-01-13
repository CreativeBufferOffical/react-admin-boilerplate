import { take, race, put } from 'redux-saga/effects';
import { ModalMessages } from 'constants/modalConstants';

import * as constants from './constants';
import * as actions from './actions';

export function* confirmationModalSaga(
  confirmationText,
  confirmationTitle = ModalMessages.DEFAULT_TITLE,
  affirmativeText = ModalMessages.DEFAULT_AFFIRMATIVE,
  negativeText = ModalMessages.DEFAULT_NEGATIVE,
  canBeUndone = false,
) {
  yield put(
    actions.openConfirmationModal(
      confirmationTitle,
      confirmationText,
      affirmativeText,
      negativeText,
      canBeUndone,
    ),
  );

  const { confirm } = yield race({
    confirm: take(constants.ACCEPT_CONFIRMATION_MODAL),
    cancel: take(constants.DECLINE_CONFIRMATION_MODAL),
  });

  return !!confirm;
}
