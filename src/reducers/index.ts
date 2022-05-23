import { History } from 'history';
import { combineReducers } from 'redux';
import * as appReducer from './appReducer';

export default (history: History) =>
  combineReducers({
    ...appReducer,
  });
