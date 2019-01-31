// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';

import * as serviceWorker from './serviceWorker';
import monotronApp from './reducers';
import AppContainer from './containers/App';


// Create Redux store
const store = createStore(monotronApp, compose(window.devToolsExtension ? window.devToolsExtension() : f => f));

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root')
);

serviceWorker.register();
