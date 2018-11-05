import React from 'react';
import Popup from "reactjs-popup";
import { NavLink } from 'react-router-dom';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { logout } from '../actions/index'

class MoreMenu extends React.Component {
    constructor() {
        super();
        this.handleLogout = this.handleLogout.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);
    }
    state = {
        open: false
    }

    closeModal() {
        this.setState({ open: false })
    };
    openModal() {
        this.setState({ open: true })
    };
    handleLogout() {
        localStorage.clear()
        this.props.logout()
        this.props.history.push('/login')
    };

    render() {
        return (
            <div>
                <button className="more" onClick={this.openModal}> More </button>
                <Popup
                modal
                open={this.state.open}
                onClose={this.closeModal}
                closeOnDocumentClick
                >
                    <div className="navbar-popup">
                        <NavLink
                            to='/dashboard/import'
                            onClick={this.closeModal}
                        >Import CSV</NavLink>
                        <button
                            className="more"
                            onClick={this.handleLogout}
                        >Logout</button>
                    </div>
                </Popup>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.current_user
  });
export default withRouter(connect(mapStateToProps, { logout })(MoreMenu))
export const NakedMoreMenu = MoreMenu;
