import { call } from 'redux-saga/effects';

import api from './api';

export default function*(request) {
  return yield call(api.post, {
    path: `schedule/constants/review-types`,
    request,
  });
}
