// @flow
import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import monotronApp from './reducers';
import AppContainer from './containers/App';

// Create Redux store
const store = createStore(monotronApp, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));

const DOMRoot = document.getElementById('root');

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  DOMRoot
);