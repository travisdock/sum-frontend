import React from 'react';
// import { PulseLoader } from 'react-spinners';
import { connect } from 'react-redux';
import { updateUser } from '../actions';

import AreYouSure from './AreYouSure.jsx'

import {
    handleUpdate, handleDelete,
    openModal
} from './settings_helpers.js';

import {
    closeModal, askIfSure
} from './modal_helpers.js'

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            category_id: null
        }
        this.handleUpdate = handleUpdate.bind(this);
        this.handleDelete = handleDelete.bind(this);
        this.closeModal = closeModal.bind(this);
        this.openModal = openModal.bind(this);
        this.askIfSure = askIfSure.bind(this);
    }

    render() {
        const props = this.props
        return (
            <div className="settings">
                <h2 className="settings">Change year view:</h2>
                <form className="settings">
                    <select
                        name="year_view"
                        defaultValue={props.current_user.year_view}
                    >
                        {props.current_user.years.map(year => <option value={year} key={year}>{year}</option>)}
                    </select>
                    <button onClick={this.handleUpdate}>Submit</button>
                </form>

                <h2 className="settings">Delete a Category:</h2>
                <form className="settings">
                    <select
                        defaultValue=""
                        name="delete_category"
                        >
                        <option value="" disabled>Select Category</option>
                        {!!this.props.current_user.categories ? this.props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>) : null}
                    </select>
                    <button type="button" onClick={this.askIfSure}>Delete</button>
                </form>
                <AreYouSure
                    open={this.state.open}
                    onOpen={this.openModal}
                    closeModal={this.closeModal}
                    handleDelete={this.handleDelete}
                    message={"Are you sure you want to delete this category and all its entries?"}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.current_user
});
  
export default connect(mapStateToProps, { updateUser })(Settings);