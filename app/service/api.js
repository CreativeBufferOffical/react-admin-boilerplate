import { call, select } from 'redux-saga/effects';

import { runLevelSelector } from 'selectors/runLevel';

import {
  deserializeJsonAsync,
  withOptions,
  throwErrorsAsync,
  getBackendForRunLevel,
  postWithBody,
  postWithoutBody,
  deleteWithoutBody,
  putWithBody,
  downloadBlob,
} from './util';

const defaultMock = () => {
  throw new Error('Mock not implemented');
};

export default {
  *download({ path, mock = defaultMock, options }) {
    const runLevel = yield select(runLevelSelector);
    if (runLevel === 'mock') return yield call(mock, { path });
    const response = yield call(
      fetch,
      getBackendForRunLevel(runLevel) + path,
      withOptions(options),
    );
    yield call(throwErrorsAsync, response);

    return yield call(downloadBlob, response);
  },
  *get({ path, mock = defaultMock, options }) {
    const runLevel = yield select(runLevelSelector);

    if (runLevel === 'mock') return yield call(mock, { path });
    const response = yield call(
      fetch,
      getBackendForRunLevel(runLevel) + path,
      withOptions(options),
    );
    yield call(throwErrorsAsync, response);
    return yield call(deserializeJsonAsync, response);
  },
  *put({ path, mock = defaultMock, request, options }) {
    const runLevel = yield select(runLevelSelector);
    if (runLevel === 'mock') return yield call(mock, { path, request });
    const response = yield call(
      fetch,
      getBackendForRunLevel(runLevel) + path,
      putWithBody(request, options),
    );
    yield call(throwErrorsAsync, response);
    return yield call(deserializeJsonAsync, response);
  },
  *post({ path, mock = defaultMock, request, options }) {
    const runLevel = yield select(runLevelSelector);
    if (runLevel === 'mock') return yield call(mock, { path, request });
    const response = yield call(
      fetch,
      getBackendForRunLevel(runLevel) + path,
      request ? postWithBody(request, options) : postWithoutBody(options),
    );
    yield call(throwErrorsAsync, response);
    return yield call(deserializeJsonAsync, response);
  },
  *delete({ path, mock = defaultMock, options }) {
    const runLevel = yield select(runLevelSelector);
    if (runLevel === 'mock') return yield call(mock, { path });
    const response = yield call(
      fetch,
      getBackendForRunLevel(runLevel) + path,
      deleteWithoutBody(options),
    );
    yield call(throwErrorsAsync, response);
    return response;
  },
};
