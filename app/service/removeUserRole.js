import { call } from 'redux-saga/effects';

import api from './api';

export default function*({ userId, userRoleId }) {
  return yield call(api.delete, {
    path: `user/${userId}/role/${userRoleId}`,
  });
}
