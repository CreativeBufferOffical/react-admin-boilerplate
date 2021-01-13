import { createSelector } from 'reselect';

const selectUnsavedChangesModal = state => state.get('unsavedChangesModal');

export const unsavedChangesModalOpen = createSelector(
  selectUnsavedChangesModal,
  state => state.get('unsavedChangesModalOpen'),
);
