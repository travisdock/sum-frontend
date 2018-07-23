import React from 'react';
import { Link } from 'react-router-dom';

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
    .then(resp => localStorage.setItem = resp)
    .catch(console.log)
  }

  render() {
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

export default Login;
