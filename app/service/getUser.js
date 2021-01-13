import { call } from 'redux-saga/effects';

import api from './api';

export default function*(userId) {
  return yield call(api.get, {
    path: `user/${userId}`,
  });
}
