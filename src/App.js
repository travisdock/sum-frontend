import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';

////////////////ACTIONS/////////////////////////
import { login, logout } from './actions/index'

//////////////CONTAINER COMPONENTS//////////////
import Navbar from './components/navbar'
import Home from './containers/home'
import Dashboard from './containers/dashboard'

class App extends Component {

  componentDidMount = () => {
    this.loggedin()
  }

  loggedin() {
    const token = localStorage.getItem('jwt')

    if (token) {
      const url = `${process.env.REACT_APP_API}/api/v1/current_user`
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token
        }
      }
      fetch(url, options)
        .then(resp => resp.json())
        .then(resp => {
          if (resp.error) {
            localStorage.clear()
            this.props.logout()
          } else {
            this.props.login(resp.id, resp.categories)
          }
        })
    } else {
      this.props.logout()
    }
  }

  render() {
    return (
      <div id="home">
        {this.props.load || !!this.props.current_user.user_id ?
          <div id="home2">
            <Navbar />
            <Switch>
              <Route path="/dashboard" component={Dashboard} />
              <Route path="/" component={Home} />
            </Switch>
          </div>
          :
          null
        }
      </div>

    );
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user,
  load: state.load
});

export default withRouter(connect(mapStateToProps, { login, logout })(App));
