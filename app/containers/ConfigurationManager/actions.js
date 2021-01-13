import * as constants from './constants';

export const selectProductConfiguraton = productName => ({
  type: constants.SELECT_PRODUCT_CONFIGURATION,
  productName,
});

export const toggleEditMode = () => ({
  type: constants.TOGGLE_EDIT_MODE,
});

export const crAppConfigLoadSuccess = crAppConfig => ({
  type: constants.CR_APPCONFIG_LOAD_SUCCESS,
  crAppConfig,
});

export const crAppConfigLoadFail = error => ({
  type: constants.CR_APPCONFIG_LOAD_FAIL,
  error,
});

export const crAppConfig = crAppConfig => ({
  type: constants.CR_APPCONFIG_LOAD,
  crAppConfig,
});

export const clearError = () => ({
  type: constants.CLEAR_ERROR,
});

export const updateCrAppConfig = crAppConfig => ({
  type: constants.UPDATE_CR_APPCONFIG,
  crAppConfig,
});

export const updateCrAppConfigSuccess = crAppConfig => ({
  type: constants.UPDATE_CR_APPCONFIG_SUCCESS,
  crAppConfig,
});

export const updateCrAppConfigFail = () => ({
  type: constants.UPDATE_CR_APPCONFIG_FAIL,
});

export const reviewTypesLoadSuccess = reviewTypes => ({
  type: constants.REVIEW_TYPES_LOAD_SUCCESS,
  reviewTypes,
});

export const reviewTypesLoadFail = error => ({
  type: constants.REVIEW_TYPES_LOAD_FAIL,
  error,
});

export const reviewType = reviewType => ({
  type: constants.REVIEW_TYPES_LOAD_SUCCESS,
  reviewType,
});

export const auditTypesLoadSuccess = auditTypes => ({
  type: constants.AUDIT_TYPES_LOAD_SUCCESS,
  auditTypes,
});

export const auditTypesLoadFail = error => ({
  type: constants.AUDIT_TYPES_LOAD_FAIL,
  error,
});

export const auditTypes = auditTypes => ({
  type: constants.AUDIT_TYPES_LOAD,
  auditTypes,
});

export const updateReviewTypes = reviewType => ({
  type: constants.UPDATE_AUDIT_TYPES,
  reviewType,
});

export const setDefaultReviewType = reviewTypeId => ({
  type: constants.SET_DEFAULT_REVIEW_TYPE,
  reviewTypeId,
});
