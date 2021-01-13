import { call } from 'redux-saga/effects';
import { stringify } from 'qs';

import api from './api';

export default function*({ userId, domain }) {
  return yield call(api.get, {
    path: `user/${userId}/permission?${stringify({ domain })}`,
  });
}
