import React from 'react';
import { Link } from 'react-router-dom';
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
    console.log("navbar",this.props)
    return (
      <div>
        { !!this.props.current_user.user_id
          ?
          <div>
            <Link to="/dashboard/form" className="nav" >Input</Link>
            <Link to="/dashboard/charts" className="nav" >Charts</Link>
            <Link to="/dashboard/entries" className="nav" >Entries</Link>
            <button
              className="logout"
              onClick={this.handleLogOut}
              >
              Logout
            </button>
          </div>
          :
          <div>
            <Link to="/login" className="nav" >Login</Link>
            <Link to="/about" className="nav" >About</Link>
            <Link to="/signup" className="nav" >Signup</Link>
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
