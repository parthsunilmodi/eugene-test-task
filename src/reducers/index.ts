import { combineReducers } from 'redux';
import { routerReducer as router, RouterState } from 'react-router-redux';

import {
  appReducer,
  State as AppState
} from './appReducer';


export interface RootState {
  router: RouterState;
  appReducer: AppState,
}
export const rootReducer = combineReducers<RootState>({
  router,
  appReducer: appReducer as any,
});
