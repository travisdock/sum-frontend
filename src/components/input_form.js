import React from 'react';

import { connect } from 'react-redux';

import { updateCategories } from '../actions';

class InputForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        category: '',
        date: new Date().toISOString().substr(0, 10),
        amount: '',
        notes: '',
        income: false,
        untracked: false
      },
      new_category: false
    };
  }


  handleChange = (e) => {
    const target = e.target;
    const value = target.value;
    const name = target.name;


    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          [name]: value
        }
      }
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const url = `${process.env.REACT_APP_API}/api/v1/entries`
    const token = localStorage.getItem('jwt')
    const formData = {
      ...this.state.form,
      user_id: this.props.current_user.user_id
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify(formData)
    }
    fetch(url, options)
      .then(res => res.json())
      .then(resp => {
        if (resp.errors) {
          alert(resp.errors)
        } else if (resp.error) {
          alert(resp.error)
        } else {
          if ( Object.prototype.toString.call( resp ) === '[object Array]' ) {
            this.props.updateCategories(resp)
          }
          alert("Success!")
          this.setState({
            form: {
              category: '',
              date: new Date().toISOString().substr(0, 10),
              amount: '',
              notes: '',
              income: false,
              untracked: false
            },
            new_category: false
          })
        }
      })

  }

  toggleCategory = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          category: '',
          income: false,
          untracked: false
        },
        new_category: !prevState.new_category
      }
    })
  }

  toggleIncome = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          income: !prevState.form.income
        }
      }
    })
  }
  toggleUntracked = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          untracked: !prevState.form.untracked,
          income: false
        }
      }
    })
  }

  render() {
    const newCategory = (<div className="ui field">
      <input
        name="category"
        value={this.state.form.category}
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
          disabled={this.state.form.untracked}
        />income</label>

        <label className="checkboxes">
        <input
          name="untracked"
          type="checkbox"
          onChange={this.toggleUntracked}
        />untracked</label>
      </div>
      {/* ADD GIFT FUNCTIONALITY(maybe make this untracked categories?) */}
      <button onClick={this.toggleCategory}>Select Category</button>
    </div>)
    const selectCategory = (<div className="ui field">
      <select
        name="category"
        value={this.state.form.category}
        onChange={this.handleChange}
        >
        <option>Select Category</option>
        {!!this.props.current_user.categories ? this.props.current_user.categories.map(cat => <option value={cat.name} key={cat.id}>{cat.name}</option>) : null}
      </select>
      <button onClick={this.toggleCategory}>Create Category</button>
    </div>)
    return (
      <div className="input_form">
        <form onSubmit={this.handleSubmit}>
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
              value={this.state.form.amount}
              onChange={this.handleChange}
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

export default connect(mapStateToProps, { updateCategories })(InputForm);
