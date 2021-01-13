import { call } from 'redux-saga/effects';

import api from './api';

export default function*(request) {
  delete request.id;
  delete request.officeId;

  return yield call(api.post, {
    path: `config/cr`,
    request,
  });
}
