import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import MoreMenu from './MoreMenu';

class Navbar extends React.Component {
  
  render() {
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
            <MoreMenu />
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
export default withRouter(connect(mapStateToProps)(Navbar))