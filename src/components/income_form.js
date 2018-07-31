import React from 'react';

import { connect } from 'react-redux';

class IncomeForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      form: {
        category: '',
        date: '',
        amount: '',
        notes: '',
        income: false,
        gift: false
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
    const url = 'http://localhost:3001/api/v1/entries'
    const formData = {
      ...this.state.form,
      user_id: this.props.current_user.user_id
    }
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    }
    fetch(url, options)
      .then(res => res.json())
      .then(resp => {
        if (resp.errors) {
          console.log(resp)
          alert(resp.errors)
        } else if (resp.error) {
          console.log(resp)
          alert(resp.error)
        } else {
          console.log(resp)
          alert("Success!")
          this.setState({
            form: {
              category: '',
              date: '',
              amount: '',
              notes: '',
              income: false,
              gift: false
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
          gift: false
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
  toggleGift = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          gift: !prevState.form.gift
        }
      }
    })
  }

  render() {
    console.log(this.state)
    const newCategory = (<div className="ui field">
      <input
        name="category"
        value={this.state.form.category}
        placeholder='Category Name'
        onChange={this.handleChange}
      />
      <label>income:</label>
      <input
        name="income"
        type="checkbox"
        onChange={this.toggleIncome}
      />
      <label>gift:</label>
      <input
        name="gift"
        type="checkbox"
        onChange={this.toggleGift}
      />
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
      <div className="income_form">
        <form onSubmit={this.handleSubmit}>
          {(this.state.new_category ? newCategory : selectCategory)}
          <div className="ui field">
            <input
              name="date"
              type="date"
              placeholder="Date"
              value={this.state.form.date}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <input
              name="amount"
              placeholder="0.00"
              value={this.state.form.amount}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <textarea
              name="notes"
              placeholder="Entry details..."
              rows="5"
              cols="55"
              value={this.state.form.notes}
              onChange={this.handleChange}
            />
          </div>
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

export default connect(mapStateToProps)(IncomeForm);
