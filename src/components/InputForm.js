import React from 'react';

import { connect } from 'react-redux';

import { updateUser } from '../actions/UserActions';
import {
  handleChange, handleSubmit,
  toggleCategory, toggleIncome,
  toggleUntracked, evaluateAmount
} from './helpers/inputFormHelpers'

class InputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        category_name: '',
        date: new Date().toISOString({timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone}).substr(0, 10),
        amount: '',
        notes: '',
        income: false,
        untracked: false
      },
      new_category: false
    };
    // Imported functions
    this.handleChange = handleChange.bind(this);
    this.handleSubmit = handleSubmit.bind(this);
    this.toggleCategory = toggleCategory.bind(this);
    this.toggleIncome = toggleIncome.bind(this);
    this.toggleUntracked = toggleUntracked.bind(this);
    this.evaluateAmount = evaluateAmount.bind(this);
  }

  render() {
    const newCategory = (<div className="ui field">
      <input
        name="category_name"
        value={this.state.form.category_name}
        placeholder='Category Name'
        onChange={this.handleChange}
      />
      <div className="checkbox_wrapper">
        <label className="checkboxes">
        <input
          name="income"
          type="checkbox"
          checked={this.state.form.income}
          onChange={this.toggleIncome}
        />income</label>

        <label className="checkboxes">
        <input
          name="untracked"
          type="checkbox"
          checked={this.state.form.untracked}
          onChange={this.toggleUntracked}
        />untracked</label>
      </div>
    </div>)
    const selectCategory = (<div className="ui field">
      <select
        name="category_name"
        value={this.state.form.category_name}
        onChange={this.handleChange}
        >
        <option value="" disabled>Select Category</option>
        {!!this.props.current_user.categories ? this.props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>) : null}
      </select>
    </div>)
    return (
      <div className="input_form">
        <form onSubmit={this.handleSubmit}>
          <label>
            <input
              name="newcategory"
              type="checkbox"
              onChange={this.toggleCategory}
              checked={this.state.new_category}
              />
            New Category?
          </label>
          {(this.state.new_category ? newCategory : selectCategory)}
            <input
              name="date"
              type="date"
              value={this.state.form.date}
              onChange={this.handleChange}
            />
            <input
              name="amount"
              placeholder="0.00"
              type="text"
              value={this.state.form.amount}
              onChange={this.handleChange}
              onBlur={this.evaluateAmount}
            />
            <textarea
              name="notes"
              placeholder="Entry details..."
              rows="5"
              cols="55"
              value={this.state.form.notes}
              onChange={this.handleChange}
            />
          <button type="submit" className="button">
            Submit
          </button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  current_user: state.current_user
});

export default connect(mapStateToProps, { updateUser })(InputForm);
