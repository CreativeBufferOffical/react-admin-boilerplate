import { all, takeLatest, put, call, select } from 'redux-saga/effects';

import getAppConfig from 'service/getAppConfig';
import updateAppConfig from 'service/updateAppConfig';
import getReviewTypes from 'service/getReviewTypes';
import getAuditTypes from 'service/getAuditTypes';
import updateReviewType from 'service/updateReviewType';
import * as actions from './actions';
import * as constants from './constants';

export default function* crAppConfigModalSaga() {
  yield all([
    takeLatest(constants.CR_APPCONFIG_LOAD, crAppConfigLoad),
    takeLatest(constants.UPDATE_CR_APPCONFIG, updateCrAppConfig),
    takeLatest(constants.REVIEW_TYPES_LOAD, reviewTypesLoad),
    takeLatest(constants.AUDIT_TYPES_LOAD, auditTypesLoad),
    takeLatest(constants.UPDATE_AUDIT_TYPES, updateReviewTypes),
  ]);
}

export function* updateCrAppConfig({ crAppConfig }) {
  try {
    const crAppConfigUpdate = yield call(updateAppConfig, crAppConfig);
    yield put(actions.updateCrAppConfigSuccess(crAppConfigUpdate));
  } catch (e) {
    yield put(actions.updateCrAppConfigFail(e.message));
  }
}

export function* crAppConfigLoad({}) {
  try {
    const crAppConfigLoad = yield call(getAppConfig);
    yield put(actions.crAppConfig(crAppConfigLoad));
  } catch (e) {
    yield put(actions.crAppConfigLoadFail(e.message));
  }
}

export function* reviewTypesLoad({}) {
  try {
    const reviewTypesLoad = yield call(getReviewTypes);
    yield put(actions.reviewTypes(reviewTypesLoad));
  } catch (e) {
    yield put(actions.reviewTypesLoadFail(e.message));
  }
}

export function* auditTypesLoad({}) {
  try {
    const auditTypesLoad = yield call(getAuditTypes);
    yield put(actions.auditTypes(auditTypesLoad));
  } catch (e) {
    yield put(actions.auditTypesLoadFail(e.message));
  }
}

export function* updateReviewTypes({ reviewType }) {
  try {
    const reviewTypeUpdate = yield call(updateReviewType, reviewType);
    yield put(actions.reviewTypesLoadSuccess(reviewTypeUpdate));
  } catch (e) {
    yield put(actions.reviewTypesLoadFail(e.message));
  }
}
