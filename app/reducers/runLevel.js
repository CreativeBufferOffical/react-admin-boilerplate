/*
 *
 * Global RunLevel reducer
 */

import * as constants from '../constants/runLevel';

let environment = constants.PRODUCTION;

if (window.location.hostname === 'localhost') {
  environment = constants.LOCAL;
}

if (window.location.hostname === 'admindev.slasnextgen.com') {
  environment = constants.DEV;
}

if (window.location.hostname === 'admintest.slasnextgen.com') {
  environment = constants.TEST;
}

export const initialState = environment;

export default (state = initialState, action) => {
  switch (action.type) {
    case constants.SET_CURRENT_RUN_LEVEL:
      return action.runLevel;

    default:
      return state;
  }
};
