import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router';

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
    const url = `${process.env.REACT_APP_API}/api/v1/users`
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
        {this.props.current_user.user_id ? <Redirect to='/dashboard' /> : null}
        <form onSubmit={this.handleSubmit}>
          <h1 className="logo">Sum.</h1>
          <div className="ui field">
            <input
              name="username"
              placeholder="Username..."
              value={this.state.username}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <input
              name="password"
              type="password"
              placeholder="Password..."
              value={this.state.password}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <input
              name="email"
              placeholder="Email..."
              value={this.state.email}
              onChange={this.handleChange}
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

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps)(withRouter(Signup));
export const noRouterSignUp = connect(mapStateToProps)(Signup);