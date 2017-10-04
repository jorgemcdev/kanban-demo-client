/* eslint global-require: 0 */

import { createStore, compose, applyMiddleware } from 'redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { browserHistory } from 'react-router';

import thunkMiddleware from 'redux-thunk';

import rootReducers from '../reducers/';
import { loadState, saveState } from './../utils/persistState';

const persistedState = loadState();

const enhancers = compose(
  applyMiddleware(
    thunkMiddleware
  )
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

export { store, history };
