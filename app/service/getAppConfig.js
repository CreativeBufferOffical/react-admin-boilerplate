import { call } from 'redux-saga/effects';

import api from './api';

export default function*() {
  return yield call(api.get, {
    path: `config/cr`,
  });
}
