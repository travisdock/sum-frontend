// Opens the modal with the correct category information
export function openModal() {
    // Find which function is needed
    const modalType = this.state.open
    function getModal() {
        switch(modalType) {
            case "ask": return "delete_category"
            case "update": return "update_category"
            default: return "error"
        }
    };

    const element = getModal()
    // input fields have name tag matching their function
    const category_name = document.getElementsByName(element)[0].value
    // Get category from redux using category name
    const category = this.props.current_user.categories.find( cat => cat.name === category_name )

    // Check to make sure a category was actually selected
    if ( category ){
        this.setState({ form: category });
    } else {
        alert("No category selected");
        this.setState({ open: false });
    };
  };
  
export function handleUserUpdate(e) {
    e.preventDefault();
    const token = localStorage.getItem('jwt')
    const element = e.target.form.elements[0]
    const user_id = this.props.current_user.user_id
    const body = {
        user_id: user_id,
        [element.name]: parseInt(element.value)
    };
    const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': token
        },
        body: JSON.stringify(body)
    };
    const url = `${process.env.REACT_APP_API}/api/v1/users/${user_id}`
    fetch(url, options)
        .then(resp => resp.json())
        .then(resp => {
            this.props.updateUser(resp)
            alert("Success!")
        });
};
export function handleCategoryUpdate(e) {
    e.preventDefault();
    const user_id = this.props.current_user.user_id
    const updated_category = this.state.form
    const body = { user_id: user_id, ...updated_category };
    const options = {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(body)
    };
    const url = `${process.env.REACT_APP_API}/api/v1/categories/${updated_category.id}`
    fetch(url, options)
        .then(resp => resp.json())
        .then(resp => {
            if (resp.errors) {
                alert(resp.errors)
            } else {
                this.props.updateUser(resp)
                alert("Success!")
            }
        }, this.closeModal());
};
export function handleDelete(e) {
    const token = localStorage.getItem('jwt')
    const category_id = this.state.form.id
    const body = {
        user_id: this.props.current_user.user_id
    };
    const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          'Authorization': token
        },
        body: JSON.stringify(body)
    };
    const url = `${process.env.REACT_APP_API}/api/v1/categories/${category_id}`
    fetch(url, options)
        .then(resp => resp.json())
        .then(resp => {
            this.props.updateUser(resp)
            alert("Success!")
        }, this.closeModal());
};