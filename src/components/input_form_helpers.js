const math = require('mathjs-expression-parser')
export function handleChange(e) {
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

  export function handleSubmit(e) {
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
          if (resp.id) {
            this.props.updateUser(resp)
          }
          alert("Success!")
          this.setState({
            form: {
              category_name: '',
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

  export function toggleCategory() {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          category_name: '',
          income: false,
          untracked: false
        },
        new_category: !prevState.new_category
      }
    })
  }

  export function toggleIncome() {
    this.setState((prevState) => {
      return {
        ...prevState,
        form: {
          ...prevState.form,
          income: !prevState.form.income,
          untracked: false
        }
      }
    })
  }
  export function toggleUntracked() {
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
  export function evaluateAmount(e) {
      if (e.target.value) {
          try {
              e.target.value = math.eval(e.target.value);
              this.handleChange(e);
          }
          catch(err) {
              alert(`There was an error: ${err.message}`)
          }
        }
  };