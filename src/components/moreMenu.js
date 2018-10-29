import React from 'react';
import { NavLink } from 'react-router-dom';
import Popup from "reactjs-popup";
import { connect } from 'react-redux';
import { logout } from '../actions/index'

import { withRouter } from 'react-router';

class MoreMenu extends React.Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout() {
        localStorage.clear()
        this.props.logout()
        this.props.history.push('/login')
    }

    render() {
        return (
            <Popup
                trigger={<button className="more"> More </button>}
                modal
                closeOnDocumentClick
                >
                    <div className="navbar-popup">
                        <NavLink
                            to='/dashboard/csv'
                        >Import CSV</NavLink>
                        <br></br>
                        <button
                            className="more"
                            onClick={this.handleLogout}
                        >Logout</button>
                    </div>
                </Popup>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.current_user
  });
  
  export default withRouter(connect(mapStateToProps, { logout })(MoreMenu))
  
