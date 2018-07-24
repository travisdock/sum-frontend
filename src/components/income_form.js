import React from 'react';

class IncomeForm extends React.Component {
  state = {
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
    // const url = 'http://localhost:3001/api/v1/users'
    // const options = {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Accept': 'application/json'
    //   },
    //   body: JSON.stringify(this.state)
    // }
    // fetch(url, options)
    //   .then(res => res.json())
    //   .then(resp => {
    //     if (resp.errors) {
    //       alert(resp.errors)
    //     } else {
    //       alert("Success!")
    //     }
    //   })
  }

  toggleCategory = () => {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
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
    const newCategory = (<div className="ui field">
      <label>Category: </label>
      <input
        name="category"
        value={this.state.form.category}
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
      <label>Category: </label>
      <select
        name="category"
        value={this.state.form.category}
        onChange={this.handleChange}
        >
        <option value="Rent">Rent</option>
        <option value="Groceries">Groceries</option>
      </select>
      <button onClick={this.toggleCategory}>Create Category</button>
    </div>)
    console.log("form", this.state);
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {(this.state.new_category ? newCategory : selectCategory)}
          <div className="ui field">
            <label>Date: </label>
            <input
              name="date"
              type="date"
              value={this.state.form.date}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Amount: </label>
            <input
              name="amount"
              value={this.state.form.amount}
              onChange={this.handleChange}
            />
          </div>
          <div className="ui field">
            <label>Notes: </label><br></br>
            <textarea
              name="notes"
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

export default IncomeForm;
