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
                <button onClick={this.props.askIfSure}>Delete Entry</button>
                <button onClick={this.props.openUpdateModal}>Update Entry</button>
            </div>
            </Popup>
        )
    }
};

export default EntryInfo;