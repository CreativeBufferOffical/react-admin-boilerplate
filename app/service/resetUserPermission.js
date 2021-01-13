import { call } from 'redux-saga/effects';

import api from './api';

export default function*({ userId, permissionTokenName }) {
  return yield call(api.post, {
    path: `user/${userId}/permission/${permissionTokenName}/reset`,
  });
}
