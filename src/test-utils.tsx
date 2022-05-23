import React, { FC, ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';
import configureStore, { history } from './reducers/store';

const { persistor, store } = configureStore();

interface AllProviderInterface {
  children: JSX.Element
}

const AllTheProviders: FC<AllProviderInterface> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <ConnectedRouter history={history} store={store}>
          <Router>
            {children}
          </Router>
        </ConnectedRouter>
      </PersistGate>
    </Provider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>,
) => render(ui, {wrapper: AllTheProviders, ...options})

export * from '@testing-library/react';
export { customRender as render  };