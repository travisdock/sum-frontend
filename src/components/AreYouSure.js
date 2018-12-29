import React from 'react';
import Popup from "reactjs-popup";

class AreYouSure extends React.Component {
    render() {
        return (
            <Popup
            open={this.props.open === "ask"}
            closeOnDocumentClick
            onClose={this.props.closeModal}
            onOpen={this.props.onOpen}
            >
            <div className="table-popup">
                <p>{this.props.message}</p>
                <button className="delete" onClick={this.props.handleDelete} >Delete</button>
                <button className="close" onClick={this.props.closeModal} >Close</button>
            </div>
            </Popup>
        )
    }
};

export default AreYouSure;