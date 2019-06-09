import React from 'react';

export default class Signup extends React.Component {
  render() {
    return (
      <div>
        <form>
          <h1 className="logo">Sum.</h1>
          <div className="ui field">
            <input
              name="username"
              placeholder="Username..."
            />
          </div>
          <div className="ui field">
            <input
              name="password"
              type="password"
              placeholder="Password..."
            />
          </div>
          <div className="ui field">
            <input
              name="email"
              placeholder="Email..."
            />
          </div>
          <p>(this does not have to be a real email)</p>
          <button type="submit" className="button">
            Sign up
          </button>
        </form>
      </div>
    )
  }
}
