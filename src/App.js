import React, { Component } from 'react';
import './App.css';

import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import { Route, Switch } from 'react-router';
import { ConnectedRouter, connectRouter, routerMiddleware } from 'connected-react-router'
import reducer from './reducers/index';

import Navbar from './components/navbar'
import Login from './containers/login'
import Signup from './containers/signup'

const history = createBrowserHistory()
const initialState = {}

const store = createStore(
  connectRouter(history)(reducer),
  initialState,
  compose(
    applyMiddleware(
      routerMiddleware(history)
    )
  )
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/login" render={() => <Login />} />
              <Route exact path="/about" render={() => (<div>Match about</div>)} />
              <Route exact path="/dashboard" render={() => (<div>Match dash</div>)} />
              <Route exact path="/signup" render={() => <Signup />} />
              <Route path="/" render={() => <Login />} />
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
