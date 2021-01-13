import { fromJS } from 'immutable';
import * as constants from './constants';

export const initialState = fromJS({
  loading: false,
  error: null,
});

export default function(state = initialState, action) {
  switch (action.type) {
    case constants.SET_LOADING:
      return state.set('loading', action.value);

    case constants.CLEAR_ERROR:
      return state.set('error', initialState.get('error'));

    case constants.CREATE_USER:
      return state.set('loading', true);
    case constants.CREATE_USER_SUCCESS:
      return state.set('loading', false);
    case constants.CREATE_USER_FAIL:
      return state.set('error', action.error).set('loading', false);

    default:
      return state;
  }
}
