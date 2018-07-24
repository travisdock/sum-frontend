import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from '../actions/index'

class Navbar extends React.Component {

  handleLogOut = () => {
    localStorage.clear()
    this.props.logout()
  }

  render() {
    return (
      <div>
        { !!this.props.current_user.user_id
          ?
          <div>
            <Link to="/dashboard" className="nav" >Dashboard</Link>
            <button onClick={this.handleLogOut}>Logout</button>
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

export default connect(mapStateToProps, { logout })(Navbar)
