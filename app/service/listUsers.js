import { call } from 'redux-saga/effects';
import { stringify } from 'qs';

import api from './api';

export default function*({ start, count }) {
  return yield call(api.get, {
    path: `user?${stringify({ start, count, includeInactive: true })}`,
  });
}
