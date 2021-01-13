import * as actions from './constants';

export const openUnsavedChangesModal = () => ({
  type: actions.OPEN_UNSAVED_CHANGES_MODAL,
});

export const acceptUnsavedChangesModal = () => ({
  type: actions.ACCEPT_UNSAVED_CHANGES_MODAL,
});

export const discardUnsavedChangesModal = () => ({
  type: actions.DISCARD_UNSAVED_CHANGES_MODAL,
});

export const cancelUnsavedChangesModal = () => ({
  type: actions.CANCEL_UNSAVED_CHANGES_MODAL,
});
