import * as constants from 'constants/runLevel.js';

export const setCurrentRunLevel = runLevel => ({
  type: constants.SET_CURRENT_RUN_LEVEL,
  runLevel,
});
