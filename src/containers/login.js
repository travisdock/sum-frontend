import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { login } from '../actions/index'


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
        alert(resp.error)
        this.setState({
          username: '',
          password: ''
        })
      } else {
        localStorage.setItem('jwt', resp.jwt);
        this.props.login(resp.id);
        this.props.history.push('/dashboard')
      }
    })
  }

  render() {

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
      console.log("props", this.props)
      fetch(url, options)
        .then(resp => resp.json())
        .then(resp => this.props.login(resp.id, resp.categories))
        .then(this.props.history.push('/dashboard'))
    }

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <div className="ui field">
            <label>Username: </label>
            <input
              name="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Password: </label>
            <input
              name="password"
              type="password"
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="button">
            Login
          </button>
          <Link to="/signup" >Need to sign up?</Link>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps, { login })(withRouter(Login));
