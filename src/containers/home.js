import React from 'react';

import { connect } from 'react-redux';
import {Redirect } from 'react-router';
import { Route } from 'react-router';

import Login from '../components/login';
import Signup from '../components/signup';
import About from '../components/about';

class Home extends React.Component {
  render() {
    return (
      <div className="content">
        { this.props.current_user.user_id ? <Redirect to='/dashboard/form' /> : null }
        <Route exact path={`${this.props.match.url}login`} component={Login} />
        <Route exact path={`${this.props.match.url}signup`} component={Signup} />
        <Route exact path={`${this.props.match.url}about`} component={About} />
        <Route exact path={`${this.props.match.url}`} component={Signup} />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(Home);
