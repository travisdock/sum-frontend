import React from 'react';
import { NavLink } from 'react-router-dom';
import Popup from "reactjs-popup";

export const MoreMenu =  () => (
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

export function handleLogout() {
    localStorage.clear()
    this.props.logout()
    this.props.history.push('/login')
  }