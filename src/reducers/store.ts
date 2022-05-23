import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import storage from 'redux-persist/lib/storage';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from './index';

const persistConfig: PersistConfig<any> = {
  key: "root",
  storage
};

const history = createBrowserHistory();

const middleware = applyMiddleware(thunk);

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

export default () => {
  const store = createStore(persistedReducer, {}, middleware) as any;
  const persistor = persistStore(store);
  return { store, persistor };
};

export { history };