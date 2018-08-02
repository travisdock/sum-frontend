export default function reducer(
  state = {
    current_user: ''
  },
  action
) {
  switch (action.type) {
    case "LOGIN":
      console.log("current user set")
      return {
        ...state, current_user: action.payload, load: false
      }
    case "LOGOUT":
      return {
        ...state, current_user: '', load: true
      }
    default:
      return state;
  }
}
