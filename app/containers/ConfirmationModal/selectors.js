import { createSelector } from 'reselect';

const selectConfirmationModal = state => state.get('confirmationModal');

export const confirmationModalOpen = createSelector(
  selectConfirmationModal,
  state => state.get('confirmationModalOpen'),
);

export const confirmationModalTitle = createSelector(
  selectConfirmationModal,
  state => state.get('confirmationModalTitle'),
);

export const confirmationModalText = createSelector(
  selectConfirmationModal,
  state => state.get('confirmationModalText'),
);

export const confirmationModalAffirmativeText = createSelector(
  selectConfirmationModal,
  state => state.get('confirmationModalAffirmativeText'),
);

export const confirmationModalNegativeText = createSelector(
  selectConfirmationModal,
  state => state.get('confirmationModalNegativeText'),
);

export const confirmationActionCanBeUndone = createSelector(
  selectConfirmationModal,
  state => state.get('confirmationActionCanBeUndone'),
);
