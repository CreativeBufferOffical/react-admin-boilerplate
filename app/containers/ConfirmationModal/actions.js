import * as actions from './constants';

export const openConfirmationModal = (
  title,
  text,
  affirmativeText,
  negativeText,
  canBeUndone,
) => ({
  type: actions.OPEN_CONFIRMATION_MODAL,
  title,
  text,
  affirmativeText,
  negativeText,
  canBeUndone,
});

export const acceptConfirmationModal = () => ({
  type: actions.ACCEPT_CONFIRMATION_MODAL,
});

export const declineConfirmationModal = () => ({
  type: actions.DECLINE_CONFIRMATION_MODAL,
});
