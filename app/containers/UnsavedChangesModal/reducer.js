/*
 *
 * Unsaved Changes Modal reducer
 *
 */

import { fromJS } from 'immutable';
import * as actions from './constants';

export const initialState = fromJS({
  unsavedChangesModalOpen: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.OPEN_UNSAVED_CHANGES_MODAL:
      return state.set('unsavedChangesModalOpen', true);
    case actions.ACCEPT_UNSAVED_CHANGES_MODAL:
    case actions.DISCARD_UNSAVED_CHANGES_MODAL:
    case actions.CANCEL_UNSAVED_CHANGES_MODAL:
      return state.set('unsavedChangesModalOpen', false);

    default:
      return state;
  }
}
