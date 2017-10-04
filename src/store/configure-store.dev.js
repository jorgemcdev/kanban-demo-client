/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import rootReducers from '../reducers/';
import { loadState, saveState } from './../utils/persistState';

const loggerMiddleware = createLogger();
const persistedState = loadState();

const enhancers = compose(
  applyMiddleware(
    loggerMiddleware,
    thunkMiddleware
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(
  rootReducers,
  persistedState,
  enhancers
);

store.subscribe(() => {
  saveState(store.getState());
});

const history = syncHistoryWithStore(browserHistory, store);

if (module.hot) {
  // Enable Webpack hot module replacement for reducers
  module.hot.accept('../reducers', () => {
    const nextRootReducer = require('./../reducers').default;
    store.replaceReducer(nextRootReducer);
  });
}

export { store, history };
