//////////////////Popup Modal Functions////////////////////////////////////
export function openModal(entry, entry_index) {
    this.setState({
      open: "info",
      data: entry,
      index: entry_index,
      form: entry
    });
  };
  export function closeModal() {
    this.setState({ open: false });
  };
  export function switchToUpdateModal() {
    this.setState({ open: "update" });
  };
  export function askIfSure() {
    this.setState({ open: "ask" });
  };
  export function handleDelete() {
    const index = this.state.index
    const token = localStorage.getItem('jwt')
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        'Authorization': token
      },
      body: JSON.stringify(this.state.data)
    };
    fetch(`${process.env.REACT_APP_API}/api/v1/entries`, options)
    .then(resp => resp.json())
    .then(resp => { if (resp.error) {
      alert(resp.exception)
    } else {
      this.setState((prevState) => {
        // Not a deep clone of the objects, just a copy of the array
        let newEntries = prevState.entries.slice(0)
        newEntries.splice(index, 1)
        return {
          entries: newEntries
        }
      })
    }}, this.closeModal())
  };
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
  export function handleUpdate(e) {
    e.preventDefault();
    if (this.state.form === this.state.data) {
      alert("No changes were made")
      this.closeModal();
      this.setState({ form: {} })
    } else {
      const index = this.state.index
      const token = localStorage.getItem('jwt')
      const updatedEntry = { id: this.state.data.id, ...this.state.form}
      const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': token
        },
        body: JSON.stringify(updatedEntry)
      };
      fetch(`${process.env.REACT_APP_API}/api/v1/entries`, options)
      .then(resp => resp.json())
      .then(resp => { if (resp.error) {
        alert(resp.exception)
      } else {
        this.setState((prevState) => {
          // Not a deep clone of the objects, just a copy of the array
          let newEntries = prevState.entries.slice(0)
          newEntries[index] = resp
          return {
            entries: newEntries,
            form: {}
          }
        }, alert("success!"))
      }}, this.closeModal())
    }
  };