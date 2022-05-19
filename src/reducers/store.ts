import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware as createRouterMiddleware } from 'react-router-redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { createBrowserHistory } from 'history';
import thunk from 'redux-thunk';

import { rootReducer, RootState } from "./index";

const persistConfig = {
  key: 'root',
  storage,
};

export const history = createBrowserHistory();
export const routerMiddleware = createRouterMiddleware(history);

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const persistedReducer = persistReducer(persistConfig, rootReducer);

export function configureStore(initialState?: RootState) {
  // configure middlewares
  const middlewares = [routerMiddleware, thunk];
  // compose enhancers
  const enhancer = compose(applyMiddleware(...middlewares));
  // create store
  // @ts-ignore
  return createStore(persistedReducer, initialState!, enhancer);
}
