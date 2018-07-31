import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/index'

import { withRouter } from 'react-router';

class Navbar extends React.Component {

  handleLogOut = () => {
    localStorage.clear()
    this.props.logout()
    this.props.history.push('/login')
  }

  render() {
    console.log("navbar")
    return (
      <div className="navbar">
        { !!this.props.current_user.user_id
          ?
          <div className="navlinks">
            <NavLink
              to='/dashboard/form'
            >Input</NavLink>
            <NavLink
              to='/dashboard/charts'
            >Charts</NavLink>
            <NavLink
              to='/dashboard/entries'
            >Entries</NavLink>
            <button
              className="logout"
              onClick={this.handleLogOut}
            >Logout</button>
          </div>
          :
          <div className="navlinks">
            <NavLink
              to='/login'
            >Login</NavLink>
            <NavLink
              to='/about'
            >About</NavLink>
            <NavLink
              to='/signup'
            >Signup</NavLink>
          </div>
        }
        </div>
      )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default withRouter(connect(mapStateToProps, { logout })(Navbar))
