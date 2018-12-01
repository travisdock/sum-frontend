export function handleYearViewChange(e) {
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
        .then(resp => console.log(resp))
};