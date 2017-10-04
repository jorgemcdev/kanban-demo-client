import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Load store
import { store } from './store/configure-store.js';

// Performance AddOn
import Perf from 'react-addons-perf';

/* Dev Performance Toll */
if (process.env.NODE_ENV === 'development') {
  window.Perf = Perf;
}

// Load Routes
import MyRoutes from './routes';

// Load Styles
import appStyles from './styles/app.scss';

render(
  <Provider store={store}>
    <MyRoutes />
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept(() => {
    render(
      <Provider store={store}>
        <MyRoutes />
      </Provider>,
      document.getElementById('root')
    );
  });
}

