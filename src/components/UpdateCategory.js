import React from 'react';
import Popup from "reactjs-popup";

class UpdateCategory extends React.Component {
    render() {
        return (
            <Popup
                open={this.props.open === "update"}
                closeOnDocumentClick
                onOpen={this.props.onOpen}
                onClose={this.props.closeModal}
            >
                <div className="table-popup">
                <p>Update Category</p>
                <form onSubmit={this.props.handleUpdate}>
                    <input
                        name="name"
                        value={this.props.name}
                        onChange={this.props.handleChange}
                        >
                    </input>
                    <label>
                    <input
                        name="income"
                        type="checkbox"
                        checked={this.props.income}
                        onChange={this.props.toggleIncome}
                    />Income</label>
                    <label>
                    <input
                        name="untracked"
                        type="checkbox"
                        checked={this.props.untracked}
                        onChange={this.props.toggleUntracked}
                    />Untracked</label>
                    <input
                        name="year"
                        value={this.props.year}
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

export default UpdateCategory;
