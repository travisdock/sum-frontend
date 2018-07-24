import React from 'react';
import { withRouter } from 'react-router';

class Signup extends React.Component {
  state = {
    username: '',
    password: '',
    email: ''
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
    const url = 'http://localhost:3001/api/v1/users'
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(this.state)
    }
    fetch(url, options)
      .then(res => res.json())
      .then(resp => {
        if (resp.errors) {
          alert(resp.errors)
        } else {
          alert("Success! Please log in.")
          this.props.history.push('/login')
        }
      })
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
          <div className="ui field">
            <label>Email: </label>
            <input
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
            />
          </div>
          <button type="submit" className="button">
            Sign up
          </button>
        </form>
      </div>
    )
  }
}

export default withRouter(Signup);
