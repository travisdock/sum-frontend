import React from 'react';
import Popup from "reactjs-popup";

class EntryInfo extends React.Component {
    render() {
        return (
            <Popup
            open={this.props.open === "info"}
            closeOnDocumentClick
            onClose={this.props.closeModal}
            >
            <div className="table-popup">
                <p>Amount: {"$" + Number(this.props.amount).toFixed(2)}</p>
                <p>Category: {this.props.category_name}</p>
                <p>Date: {this.props.date}</p>
                <p>Notes: {this.props.notes}</p>
                <button className="delete" onClick={this.props.askIfSure}>Delete Entry</button>
                <button className="update" onClick={this.props.openUpdateModal}>Update Entry</button>
                <button className="copy" onClick={() => this.props.copyEntry(this.props)}>Copy Entry</button>
            </div>
            </Popup>
        )
    }
};

export default EntryInfo;