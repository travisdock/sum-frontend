import React from 'react';
import { connect } from 'react-redux';
import { updateUser } from '../actions';

// Import modals
import AreYouSure from './AreYouSure'
import UpdateCategory from './UpdateCategory'

import {
    handleUserUpdate, handleDelete,
    openModal, handleCategoryUpdate
} from './helpers/settingsHelpers';

import {
    closeModal, askIfSure,
    openUpdateModal, handleChange
} from './helpers/modalHelpers'

import {
    toggleIncome, toggleUntracked
} from './helpers/inputFormHelpers'

class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            open: false,
            form: {
                name: '',
                income: '',
                untracked: '',
                year: ''
            }
        }
        this.handleUserUpdate = handleUserUpdate.bind(this);
        this.handleDelete = handleDelete.bind(this);
        this.closeModal = closeModal.bind(this);
        this.openModal = openModal.bind(this);
        this.askIfSure = askIfSure.bind(this);
        this.openUpdateModal = openUpdateModal.bind(this);
        this.handleChange = handleChange.bind(this);
        this.toggleIncome = toggleIncome.bind(this);
        this.toggleUntracked = toggleUntracked.bind(this);
        this.handleCategoryUpdate = handleCategoryUpdate.bind(this);
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
                    <button className="year_view" onClick={this.handleUserUpdate}>Submit</button>
                </form>

                <h2 className="settings">Delete a Category:</h2>
                <form className="settings">
                    <select
                        defaultValue=""
                        name="delete_category"
                    >
                        <option value="" disabled>Select Category</option>
                        {!!props.current_user.categories ? props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>) : null}
                    </select>
                    <button className="delete_category" type="button" onClick={this.askIfSure}>Delete</button>
                </form>

                <h2 className="settings">Update a Category:</h2>
                <form className="settings">
                    <select
                        defaultValue=""
                        name="update_category"
                    >
                        <option value="" disabled>Select Category</option>
                        {!!props.current_user.categories ? props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>) : null}
                    </select>
                    <button className="update_category" type="button" onClick={this.openUpdateModal}>Update</button>
                </form>

                <AreYouSure
                    open={this.state.open}
                    onOpen={this.openModal}
                    closeModal={this.closeModal}
                    handleDelete={this.handleDelete}
                    message={"Are you sure you want to delete this category and all its entries?"}
                />
                <UpdateCategory
                    open={this.state.open}
                    onOpen={this.openModal}
                    closeModal={this.closeModal}
                    handleChange={this.handleChange}
                    toggleIncome={this.toggleIncome}
                    toggleUntracked={this.toggleUntracked}
                    handleUpdate={this.handleCategoryUpdate}
                    current_user={this.props.current_user}
                    name={this.state.form.name}
                    income={this.state.form.income}
                    untracked={this.state.form.untracked}
                    year={this.state.form.year}
                />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    current_user: state.current_user
});
  
export default connect(mapStateToProps, { updateUser })(Settings);