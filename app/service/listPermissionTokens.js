import { call } from 'redux-saga/effects';
import { stringify } from 'qs';

import api from './api';

export default function*(domain) {
  return yield call(api.get, {
    path: `permission-token?${stringify({ domain })}`,
  });
}
