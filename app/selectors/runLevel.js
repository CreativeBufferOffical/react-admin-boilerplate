import { initialState } from 'reducers/runLevel';

export const runLevelSelector = state => state.get('runLevel', initialState);
