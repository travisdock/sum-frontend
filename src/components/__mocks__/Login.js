import React from 'react';

export default class Login extends React.Component {
  render() {
    return (
      <div>
        <form>
          <h1 className="logo">Sum.</h1>
          <div className="ui field">
            <input
              name="username"
              placeholder="Username"
              type="text"
            />
          </div>
          <div className="ui field">
            <input
              name="password"
              placeholder="Password"
              type="password"
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
