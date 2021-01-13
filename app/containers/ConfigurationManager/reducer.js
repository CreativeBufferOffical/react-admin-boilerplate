/*
 *
 * App reducer
 *
 */

import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS({
  crAppconfig: null,
  editMode: false,
  reviewTypesById: {},
  auditTypesById: {},
  defaultReviewTypeId: null,
  defaultAuditTypeId: null,
});

export default function(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case constants.SELECT_PRODUCT_CONFIGURATION:
      return state.set('selectedProduct', action.productName);

    case constants.CR_APPCONFIG_LOAD:
      return state.set('crAppConfig', action.crAppConfig);
    // return state
    // .set(
      //  'crAppconfig',
    //  //new Map()
      // .set('officeId', action.crAppConfig.officeId),
      //  .set('timeToLockoutDays', action.crAppConfig.timeToLockoutDays)
      //  .set('reportSentDays', action.crAppConfig.reportSentDays)
      //  .set('cAFResponseTimeDays', action.crAppConfig.cAFResponseTimeDays)
      //  .set('ratePerMile', action.crAppConfig.ratePerMile)
      //  .set('ratePerDiem', action.crAppConfig.ratePerDiem),
      // );

    case constants.UPDATE_CR_APPCONFIG:
      return state.set('crAppConfig', action.crAppConfig);

    //  case constants.REVIEW_TYPES_LOAD_SUCCESS:
    //  return state.set('reviewTypes', action.reviewTypesLoadSuccess);

    case constants.REVIEW_TYPES_LOAD_SUCCESS:
      return state
        .set(
          'reviewTypesById',
          action.reviewTypes.reduce(
            (reviewTypesById, reviewType) =>
              reviewTypesById.set(reviewType.id, fromJS(reviewType)),
            state.get('reviewTypesById'),
          ),
        )
        .set('documentsLoading', false);

    case constants.SET_DEFAULT_REVIEW_TYPE:
      return state.set('defaultReviewTypeId', action.reviewTypeId);

    case constants.AUDIT_TYPES_LOAD:
      //  console.log(action.auditTypes)
      return state.set('auditTypes', action.auditTypes);

    case constants.UPDATE_REVIEW_TYPES:
      return state.set('reviewType', action.updateReviewTypes);

    case constants.TOGGLE_EDIT_MODE:
      return state.set('editMode', !state.get('editMode'));

    default:
      return state;
  }
}
