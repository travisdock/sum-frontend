import React from 'react';

export default class Login extends React.Component {
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
    fetch(`${process.env.REACT_APP_API}/api/v1/login`, options)
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
        this.props.login(resp);
      }
    })
  }

  render() {
    return (
      <div>
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

