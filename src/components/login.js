import React from 'react';

import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

import { login } from '../actions/index';


class Login extends React.Component {
  state = {
    username: '',
    password: ''
  };

  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify(this.state)
    };
    fetch('http://localhost:3001/api/v1/login', options)
    .then(resp => resp.json())
    .then(resp => {
      if (resp.error) {
        console.log(resp)
        alert(resp.error)
        this.setState({
          username: '',
          password: ''
        })
      } else {
        localStorage.setItem('jwt', resp.jwt);
        this.props.login(resp.id, resp.categories);
      }
    })
  }

  render() {
    console.log("login")
    return (
      <div>
        {this.props.current_user.user_id ? <Redirect to='/dashboard/form' /> : null}

        <form onSubmit={this.handleSubmit}>
          <h1 className="logo">Sum.</h1>
          <div className="ui field">
            <input
              name="username"
              placeholder="Username"
              type="text"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <input
              name="password"
              placeholder="Password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps, { login })(withRouter(Login));
