import { createSelector } from 'reselect';

const selectConfiguration = state => state.get('configurationManager');

export const productNameSelector = createSelector(selectConfiguration, state =>
  state.get('selectedProduct'),
);

export const selectCrAppConfig = createSelector(selectConfiguration, state =>
  state.get('crAppConfig'),
);

export const isEditModeSelector = createSelector(selectConfiguration, state =>
  state.get('editMode'),
);

export const getReviewTypes = createSelector(selectConfiguration, state =>
  state.get('reviewTypes'),
);

export const getAuditTypes = createSelector(selectConfiguration, state =>
  state.get('auditTypes'),
);

export const updateReviewTypes = createSelector(selectConfiguration, state =>
  state.get('reviewType'),
);
