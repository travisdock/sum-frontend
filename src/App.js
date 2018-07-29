import React, { Component } from 'react';
import './App.css';

import { Route, Switch } from 'react-router';
import { connect } from 'react-redux';
import { login } from './actions/index'

import Navbar from './components/navbar'
import Login from './containers/login'
import Signup from './containers/signup'
import Dashboard from './containers/dashboard'


import { withRouter } from 'react-router';

class App extends Component {
  state = {
    load: false
  }
  componentDidMount = () => {
    this.loggedin()
  }

  loggedin() {
    const token = localStorage.getItem('jwt')

    if (token) {
      const url = 'http://localhost:3001/api/v1/current_user'
      const options = {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': token
        }
      }
      fetch(url, options)
        .then(resp => resp.json())
        .then(resp => this.props.login(resp.id, resp.categories))
        .then(console.log("token found"))
    } else {
      this.setState({load: true})
      console.log("no token")
    }
  }

  render() {
    console.log("app")
    console.log(this.props.current_user)
    return (
      <div>
        {this.state.load || this.props.current_user.user_id ?
          <div>
            <Navbar />
            <Switch>
              <Route exact path="/login" component={Login} />
              <Route exact path="/about" render={() => (<div>Match about</div>)} />
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/signup" component={Signup} />
              <Route path="/" component={Login} />
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
  current_user: state.current_user
});

export default withRouter(connect(mapStateToProps, { login })(App));
