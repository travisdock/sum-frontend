import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';

import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'


import reducer from './reducers/index';

const history = createBrowserHistory()
const initialState = {
  current_user: {
    id: '',
    categories: []
  }
}

const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root')
);
registerServiceWorker();
