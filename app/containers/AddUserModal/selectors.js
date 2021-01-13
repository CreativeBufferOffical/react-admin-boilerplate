import { createSelector } from 'reselect';

const selectAddUserModal = state => state.get('addUserModal');

export const selectLoading = createSelector(selectAddUserModal, state =>
  state.get('loading'),
);

export const selectError = createSelector(selectAddUserModal, state =>
  state.get('error'),
);
