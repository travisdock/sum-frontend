import React from 'react';
import Popup from "reactjs-popup";

export class UpdateEntry extends React.Component {
    render() {
        return (
            <Popup
                open={this.props.open === "update"}
                closeOnDocumentClick
                onClose={this.props.closeModal}
                onOpen={this.props.openUpdateModal}
            >
                <div className="table-popup">
                <p>Update Entry</p>
                <form onSubmit={this.props.handleUpdate}>
                    <select
                        name="category_name"
                        value={this.props.category_name}
                        onChange={this.props.handleChange}
                        >
                        {this.props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>)}
                    </select>
                    <input
                        name="date"
                        type="date"
                        value={this.props.date}
                        onChange={this.props.handleChange}
                    />
                    <input
                        name="amount"
                        placeholder="0.00"
                        value={this.props.amount}
                        onChange={this.props.handleChange}
                        onBlur={this.props.evaluateAmount}
                    />
                    <textarea
                        name="notes"
                        placeholder="Entry details..."
                        rows="5"
                        cols="55"
                        value={this.props.notes}
                        onChange={this.props.handleChange}
                    />
                    <button type="submit" className="button">
                    Submit
                    </button>
                </form>

                </div>
            </Popup>
        )
    }
};

export default UpdateEntry;
