/*
 *
 * Confirmation Modal reducer
 *
 */

import { fromJS } from 'immutable';
import * as actions from './constants';

export const initialState = fromJS({
  confirmationModalOpen: false,
  confirmationModalTitle: null,
  confirmationModalText: null,
  confirmationModalAffirmativeText: 'Yes',
  confirmationModalNegativeText: 'No',
  confirmationActionCanBeUndone: false,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.OPEN_CONFIRMATION_MODAL:
      return state
        .set('confirmationModalOpen', true)
        .set('confirmationModalTitle', action.title)
        .set('confirmationModalText', action.text)
        .set('confirmationModalAffirmativeText', action.affirmativeText)
        .set('confirmationModalNegativeText', action.negativeText)
        .set('confirmationActionCanBeUndone', action.canBeUndone);
    case actions.ACCEPT_CONFIRMATION_MODAL:
    case actions.DECLINE_CONFIRMATION_MODAL:
      return state
        .set('confirmationModalOpen', initialState.get('confirmationModalOpen'))
        .set('confirmationModalText', initialState.get('confirmationModalText'))
        .set(
          'confirmationModalAffirmativeText',
          initialState.get('confirmationModalAffirmativeText'),
        )
        .set(
          'confirmationModalNegativeText',
          initialState.get('confirmationModalNegativeText'),
        )
        .set(
          'confirmationActionCanBeUndone',
          initialState.get('confirmationActionCanBeUndone'),
        );

    default:
      return state;
  }
}
